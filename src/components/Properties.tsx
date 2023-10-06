import {
  RiBubbleChartLine,
  RiClipboardLine,
  RiDeleteBin7Line,
  RiFileCopy2Line,
  RiHashtag,
  RiHistoryLine,
  RiPushpinFill,
  RiPushpinLine,
  RiTimerFlashLine,
  RiTimerLine
} from 'react-icons/ri';
import moment from 'moment';
import actions from '@/shared/actions';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useAppContext } from '@/context/AppContext';
import { AnimatePresence, m as motion } from 'framer-motion';
import { _properties as Container } from '@/styles/modules/_properties';
import { Note } from '@/types';
import { EditorState } from '@tiptap/pm/state';
import { generateText } from '@tiptap/react';
import { editorExtensions } from './editor/Editor';

export default function Properties() {
  const { state, dispatch, useFetchAPI } = useAppContext();

  const handleCopyToClipboard = async () => {
    dispatch({
      type: actions.PROPERTIES_DRAWER,
      payload: { ...state, isPropertiesDrawer: false }
    });

    const result = generateText(state.currentNote.content, editorExtensions, {
      blockSeparator: '\n'
    });
    try {
      await navigator.clipboard.writeText(result);
      dispatch({
        type: actions.TOAST,
        payload: {
          ...state,
          toast: {
            ...state.toast,
            title: 'Note Copied!',
            message: 'Note copied to clipboard successfully',
            status: true,
            actionButtonMessage: 'Close',
            handleFunction: () =>
              dispatch({
                type: actions.TOAST,
                payload: {
                  ...state,
                  toast: { ...state.toast, status: false }
                }
              })
          }
        }
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: actions.TOAST,
        payload: {
          ...state,
          toast: {
            ...state.toast,
            title: 'Note Copy Error',
            message: 'Failed to copy note to the clipboard.',
            status: true,
            actionButtonMessage: 'Retry',
            handleFunction: handleCopyToClipboard
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
              const { title, content, metadata } = state.currentNote;
              await useFetchAPI<Note>({
                method: 'post',
                url: '/api/v1/notes',
                data: {
                  title: title.includes('(Duplicated)')
                    ? title
                    : `(Duplicated) ${title}`,
                  content,
                  metadata
                }
              });
              dispatch({
                type: actions.TOAST,
                payload: {
                  ...state,
                  toast: {
                    ...state.toast,
                    title: 'Duplicate Confirmation',
                    message: 'Note duplicated successfully',
                    status: true,
                    actionButtonMessage: 'Close',
                    handleFunction: () =>
                      dispatch({
                        type: actions.TOAST,
                        payload: {
                          ...state,
                          toast: { ...state.toast, status: false }
                        }
                      })
                  }
                }
              });
              dispatch({
                type: actions.PROPERTIES_DRAWER,
                payload: { ...state, isPropertiesDrawer: false }
              });
            } catch (error: any) {
              console.error(error?.response?.data?.message || error);
              dispatch({
                type: actions.TOAST,
                payload: {
                  ...state,
                  toast: {
                    ...state.toast,
                    title: 'Duplicate Note Error',
                    message:
                      error?.response?.data?.message ||
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
                title='Close'
                className='box-btn_close'
                onClick={() =>
                  dispatch({
                    type: actions.PROPERTIES_DRAWER,
                    payload: {
                      ...state,
                      isPropertiesDrawer: false
                    }
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
                  {state.currentNote.metadata.pinned ? (
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
                  <span>{state.currentNote.metadata.priority}</span>
                </div>

                <div className='item-container priority-container'>
                  <h3>
                    <RiBubbleChartLine />
                    <span>Status: </span>
                  </h3>
                  <span>{state.currentNote.metadata.status}</span>
                </div>
                {state.currentNote.metadata.tags.length > 0 ? (
                  <div className='item-container tags-container'>
                    <h3>
                      <RiHashtag />
                      <span>Tags: </span>
                    </h3>
                    <div className='tags-container_content'>
                      {state.currentNote.metadata.tags.map((tag) => (
                        <div
                          style={{ backgroundColor: tag.color }}
                          key={tag.id}>
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
                    <span>Updated</span>
                  </h3>
                  <span>
                    {moment(state.currentNote.updatedAt || Date.now()).format(
                      'DD-MM-YY, hh:mm:ss'
                    )}
                  </span>
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
                  onClick={handleCopyToClipboard}>
                  <RiClipboardLine />
                  <span>Copy as text</span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.8 }}
                  className='action delete-button'>
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
