import {
  RiBubbleChartLine,
  RiClipboardLine,
  RiDeleteBin7Line,
  RiFileCopy2Line,
  RiFileExcel2Line,
  RiHashtag,
  RiHistoryLine,
  RiHtml5Line,
  RiMarkdownLine,
  RiPushpinFill,
  RiPushpinLine,
  RiTimerFlashLine,
  RiTimerLine
} from 'react-icons/ri';
import moment from 'moment';
import { FetchError, Note } from '@/types';
import { useMemo } from 'react';
import TurndownService from 'turndown';
import actions from '@/shared/actions';
import { useNavigate } from 'react-router-dom';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useAppContext } from '@/context/AppContext';
import { readingTime } from 'reading-time-estimator';
import { generateText, generateJSON } from '@tiptap/react';
import { AnimatePresence, m as motion } from 'framer-motion';
import { editorExtensions as extensions } from './editor/Editor';
import JSONCSVDownloader from 'react-json-to-csv';
import { _properties as Container } from '@/styles/modules/_properties';

type ExportTypes = 'markdown' | 'html' | 'text';

export default function Properties() {
  const { state, dispatch, useFetchAPI } = useAppContext();
  const navigate = useNavigate();

  const metadata = useMemo(() => {
    try {
      const content = generateText(
        generateJSON(state.currentNote.content, extensions),
        extensions
      );
      const estimatedLines = content.split('\n').length;
      const measure = readingTime(content, undefined, 'en');

      return {
        words: measure.words,
        lines: estimatedLines,
        time: `${measure.minutes} minutes`,
        characters: content.length
      };
    } catch (error) {
      console.log(error);
      return {
        words: 'unknown',
        lines: 'unknown',
        time: 'unknown',
        characters: 'unknown'
      };
    }
  }, [state.currentNote]);

  const CSVData = useMemo(() => {
    const note = state.currentNote;
    const columns: string[] = [
      'Title',
      'Status',
      'Priority',
      'Content',
      'Tags',
      'createdAt',
      'updatedAt'
    ];

    const data = [
      {
        title: note.title,
        status: note.status,
        priority: note.priority,
        content: generateText(generateJSON(note.content, extensions), extensions, {
          blockSeparator: '\n'
        }),
        tags: note.tags.map((tag) => tag.value).toString(),
        createdAt: note.createdAt,
        updatedAt: note.updatedAt
      }
    ];

    return {
      filename: `${note.title || 'Untitled'}_${new Date().toISOString()}`,
      data,
      columns
    };
  }, [state.currentNote]);

  const exportToClipboard = async (type: ExportTypes) => {
    dispatch({
      type: actions.PROPERTIES_DRAWER,
      payload: { ...state, isPropertiesDrawer: false }
    });

    try {
      if (Object.keys(state.currentNote.content).length < 1)
        throw new Error('Cannot export empty notes to clipboard.');

      const clipboard = async (data: string) => navigator.clipboard.writeText(data);
      const html = state.currentNote.content;
      const markdown = new TurndownService({}).turndown(html);
      const text = generateText(
        generateJSON(state.currentNote.content, extensions),
        extensions,
        { blockSeparator: '\n' }
      );

      switch (type) {
        case 'html':
          await clipboard(html);
          break;
        case 'markdown':
          await clipboard(markdown);
          break;
        case 'text':
          await clipboard(text);
          break;
        default:
          return undefined;
      }

      dispatch({
        type: actions.TOAST,
        payload: {
          ...state,
          toast: {
            title: 'Note Copied!',
            message: 'Note contents copied to clipboard successfully',
            status: true,
            closeOnDelay: true
          }
        }
      });
    } catch (error: unknown) {
      console.error(error);
      dispatch({
        type: actions.TOAST,
        payload: {
          ...state,
          toast: {
            title: 'Note Copy Error',
            message:
              (error as Error).message || 'Failed to copy note contents to clipboard.',
            status: true,
            actionButtonMessage: 'Retry',
            handleFunction: exportToClipboard
          }
        }
      });
    }
  };

  const handleDuplicate = () => {
    dispatch({
      type: actions.PROMPT,
      payload: {
        ...state,
        prompt: {
          status: true,
          title: 'Duplicate Note',
          actionButtonMessage: 'Yes, duplicate.',
          message: 'Do you really want to make a new copy of this note?',
          handleFunction: async () => {
            try {
              // eslint-disable-next-line prefer-const, @typescript-eslint/no-unused-vars
              let { _id, title, content, ...data } = state.currentNote;

              title = title.includes('(Duplicated)') ? title : `(Duplicated) ${title}`;

              await useFetchAPI<Note>({
                method: 'post',
                url: '/api/v1/notes',
                data: { title, content, ...data }
              });
              dispatch({
                type: actions.TOAST,
                payload: {
                  ...state,
                  toast: {
                    title: 'Duplicate Confirmation',
                    message: 'Note duplicated successfully',
                    status: true,
                    closeOnDelay: true
                  }
                }
              });
              dispatch({
                type: actions.PROPERTIES_DRAWER,
                payload: { ...state, isPropertiesDrawer: false }
              });
            } catch (error) {
              console.error((error as FetchError).response?.data?.message || error);
              dispatch({
                type: actions.TOAST,
                payload: {
                  ...state,
                  toast: {
                    title: 'Duplicate Note Error',
                    message:
                      (error as FetchError).response?.data?.message ||
                      'Failed to make a new copy of your note data.',
                    status: true,
                    actionButtonMessage: 'Retry',
                    handleFunction: handleDuplicate
                  }
                }
              });
            } finally {
              dispatch({
                type: actions.PROMPT,
                payload: {
                  ...state,
                  prompt: { ...state.prompt, status: false }
                }
              });
            }
          }
        }
      }
    });
  };

  const handleMoveNoteToTrash = () => {
    dispatch({
      type: actions.PROMPT,
      payload: {
        ...state,
        prompt: {
          status: true,
          title: 'Move to Trash',
          actionButtonMessage: 'Confirm',
          message: 'Do you really want to move this note to trash?',
          handleFunction: async () => {
            dispatch({
              type: actions.PROPERTIES_DRAWER,
              payload: { ...state, isPropertiesDrawer: false }
            });

            try {
              const { _id, ...data } = state.currentNote;
              await useFetchAPI<Note>({
                method: 'patch',
                url: `/api/v1/notes/${_id}`,
                data: { ...data, deleted: true }
              });
              navigate('/workspace', { replace: true });
            } catch (error) {
              console.error((error as FetchError).response?.data?.message || error);
              dispatch({
                type: actions.TOAST,
                payload: {
                  ...state,
                  toast: {
                    title: 'Delete Error',
                    message:
                      (error as FetchError).response?.data?.message ||
                      'Failed to move your note data to trash.',
                    status: true,
                    actionButtonMessage: 'Retry',
                    handleFunction: handleMoveNoteToTrash
                  }
                }
              });
            } finally {
              dispatch({
                type: actions.PROMPT,
                payload: {
                  ...state,
                  prompt: { ...state.prompt, status: false }
                }
              });
            }
          }
        }
      }
    });
  };

  return (
    <AnimatePresence>
      {state.isPropertiesDrawer && (
        <Container>
          <motion.div
            className='main-container'
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, x: 300, transition: { duration: 0.5 } }}>
            <div className='header-container'>
              <h3>{state.currentNote.title || 'Untitled'}</h3>

              <motion.button
                whileTap={{ scale: 0.8 }}
                className='box-btn_close'
                onClick={() =>
                  dispatch({
                    type: actions.PROPERTIES_DRAWER,
                    payload: { ...state, isPropertiesDrawer: false }
                  })
                }>
                <Cross2Icon />
              </motion.button>
            </div>

            <div className='data-container'>
              <h2>
                <span>Properties</span>
              </h2>
              <section>
                <div className='item-container priority-container'>
                  {state.currentNote.pinned ? (
                    <h3>
                      <RiPushpinFill />
                      <span>Pinned note</span>
                    </h3>
                  ) : (
                    <h3>
                      <RiPushpinLine />
                      <span>Unpined note</span>
                    </h3>
                  )}
                </div>

                <div className='item-container priority-container'>
                  <h3>
                    <RiTimerFlashLine />
                    <span>Priority: </span>
                  </h3>
                  <span>{state.currentNote.priority}</span>
                </div>

                <div className='item-container priority-container'>
                  <h3>
                    <RiBubbleChartLine />
                    <span>Status: </span>
                  </h3>
                  <span>{state.currentNote.status}</span>
                </div>
                {state.currentNote.tags.length > 0 ? (
                  <div className='item-container tags-container'>
                    <h3>
                      <RiHashtag />
                      <span>Tags: </span>
                    </h3>
                    <div className='tags-container_content'>
                      {state.currentNote.tags.map((tag) => (
                        <div style={{ backgroundColor: tag.color }} key={tag.id}>
                          <span>{tag.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className='item-container'>
                  <h3>
                    <RiTimerLine />
                    <span>Created:</span>
                  </h3>
                  <span>
                    {moment(state.currentNote.createdAt || Date.now()).format(
                      'DD-MM-YY, hh:mm:ss'
                    )}
                  </span>
                </div>
                <div className='item-container'>
                  <h3>
                    <RiHistoryLine />
                    <span>Modfied:</span>
                  </h3>
                  <span>
                    {moment(state.currentNote.updatedAt || Date.now()).format(
                      'DD-MM-YY, hh:mm:ss'
                    )}
                  </span>
                </div>
                <div className='item-container'>
                  <h3>
                    <RiHistoryLine />
                    <span>Word count:</span>
                  </h3>
                  <span>{metadata.words}</span>
                </div>
                <div className='item-container'>
                  <h3>
                    <RiHistoryLine />
                    <span>Characters count:</span>
                  </h3>
                  <span>{metadata.characters}</span>
                </div>
                <div className='item-container'>
                  <h3>
                    <RiHistoryLine />
                    <span>Lines:</span>
                  </h3>
                  <span>{metadata.lines}</span>
                </div>
                <div className='item-container'>
                  <h3>
                    <RiHistoryLine />
                    <span>Read time:</span>
                  </h3>
                  <span>{metadata.time}</span>
                </div>
              </section>
            </div>

            <hr />

            <div className='actions-container'>
              <h2>
                <span>Actions</span>
              </h2>
              <section>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  className='action'
                  onClick={() => {
                    dispatch({
                      type: actions.PROPERTIES_DRAWER,
                      payload: { ...state, isPropertiesDrawer: false }
                    });
                    handleDuplicate();
                  }}>
                  <RiFileCopy2Line />
                  <span>Duplicate</span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.8 }}
                  className='action'
                  onClick={() => exportToClipboard('text')}>
                  <RiClipboardLine />
                  <span>Copy as Text</span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.8 }}
                  className='action'
                  onClick={() => exportToClipboard('markdown')}>
                  <RiMarkdownLine />
                  <span>Copy as Markdown</span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.8 }}
                  className='action'
                  onClick={() => exportToClipboard('html')}>
                  <RiHtml5Line />
                  <span>Copy as HTML</span>
                </motion.button>

                <JSONCSVDownloader
                  style={{ all: 'unset', width: '100%', maxWidth: '100%' }}
                  data={CSVData.data}
                  headers={CSVData.columns}
                  filename={CSVData.filename}>
                  <motion.button whileTap={{ scale: 0.8 }} className='action'>
                    <RiFileExcel2Line />
                    <span>Download as CSV</span>
                  </motion.button>
                </JSONCSVDownloader>

                <motion.button
                  whileTap={{ scale: 0.8 }}
                  className='action delete-button'
                  onClick={handleMoveNoteToTrash}>
                  <RiDeleteBin7Line />
                  <span>Move to trash</span>
                </motion.button>
              </section>
            </div>
          </motion.div>
        </Container>
      )}
    </AnimatePresence>
  );
}
