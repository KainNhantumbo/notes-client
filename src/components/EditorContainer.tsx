import 'react-tagsinput/react-tagsinput.css';
import '@uiw/react-markdown-preview/markdown.css';
import '@uiw/react-markdown-editor/esm/index.css';
import '@uiw/react-markdown-editor/esm/components/ToolBar/index.css';

import {
  MixerHorizontalIcon,
  StarFilledIcon,
  StarIcon,
} from '@radix-ui/react-icons';
import { FC, useEffect, useState } from 'react';
import actions from '../data/actions';
import { useAppContext } from '../context/AppContext';
import { colorsOptions } from '../data/app-data';
import { _editor as Container } from '@/styles/modules/_editor';
import { TwitterPicker } from 'react-color';

import MarkdownEditor from '@uiw/react-markdown-editor';
import { DefaultTheme, useTheme } from 'styled-components';
import { useThemeContext } from '../context/ThemeContext';
import { m as motion } from 'framer-motion';
import TagsInput from 'react-tagsinput';
import rehypeSanitize from 'rehype-sanitize';
import { RehypeRewriteOptions } from 'rehype-rewrite';
import rehypeHighlight from 'rehype-highlight';
import rehypeformat from 'rehype-format';
import rehyped from 'rehype-stringify';
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

const EditorContainer: FC = (): JSX.Element => {
  const theme: DefaultTheme = useTheme();
  const { darkmode } = useThemeContext();
  const { state, dispatch, fetchAPI } = useAppContext();
  const [innerHeight, setInnerHeight] = useState<number>(0);
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);

  const computeInnerHeight = (): void => {
    setInnerHeight(() => {
      return Number(window.innerHeight.toFixed(1)) - 250;
    });
  };

  const handleChangeTag = (tags: string[]): void => {
    dispatch({
      type: actions.CURRENT_NOTE,
      payload: {
        ...state,
        currentNote: {
          ...state.currentNote,
          metadata: {
            ...state.currentNote.metadata,
            tags: [...tags],
          },
        },
      },
    });
  };

  useEffect(() => {
    computeInnerHeight();
    window.addEventListener('resize', computeInnerHeight);
    return () => {
      window.removeEventListener('resize', computeInnerHeight);
    };
  }, []);

  return (
    <Container>
      <section className='header-container'>
        <div className='form-container'>
          <input
            type='text'
            name='title'
            placeholder='Untitled'
            aria-label='Your note title'
            value={state.currentNote.title}
            maxLength={128}
            required
            onChange={(e): void =>
              dispatch({
                type: actions.CURRENT_NOTE,
                payload: {
                  ...state,
                  currentNote: { ...state.currentNote, title: e.target.value },
                },
              })
            }
          />
          <span className='counter'>{`${
            state.currentNote.title.length.toString() || String(0)
          } / 128`}</span>
        </div>

        <div className='properties-container'>
          <button
            className='favorite'
            onClick={() =>
              dispatch({
                type: actions.CURRENT_NOTE,
                payload: {
                  ...state,
                  currentNote: {
                    ...state.currentNote,
                    metadata: {
                      ...state.currentNote.metadata,
                      favorite: !state.currentNote.metadata.favorite,
                    },
                  },
                },
              })
            }>
            {state.currentNote.metadata.favorite ? (
              <>
                <StarFilledIcon />
                <span>Stared</span>
              </>
            ) : (
              <>
                <StarIcon />
                <span>Star</span>
              </>
            )}
          </button>

          <div className='priority-selector'></div>
          <div className='label-selector'></div>
          <div
            className='color-selector'
            onClick={() => setDisplayColorPicker(false)}>
            <motion.button
              onClick={() => {
                setDisplayColorPicker(true);
              }}>
              <MixerHorizontalIcon color={state.currentNote.metadata.color} />
              <span>Pick a color</span>
            </motion.button>

            {displayColorPicker ? (
              <TwitterPicker
                className='color-picker'
                colors={colorsOptions}
                color={state.currentNote.metadata.color}
                triangle='top-left'
                onChange={(color) => {
                  dispatch({
                    type: actions.CURRENT_NOTE,
                    payload: {
                      ...state,
                      currentNote: {
                        ...state.currentNote,
                        metadata: {
                          ...state.currentNote.metadata,
                          color: String(color.hex),
                        },
                      },
                    },
                  });
                }}
              />
            ) : null}
          </div>
          <div className='tags-component-container'>
            <TagsInput
              className='tags-input-component'
              focusedClassName='tags-input-component--focus'
              value={state.currentNote.metadata.tags}
              onChange={handleChangeTag}
              onlyUnique={true}
              inputProps={{
                className: 'tags-input-component--input',
                placeholder: 'Add a tag',
              }}
              tagProps={{
                className: 'tags-input-component--tag',
                classNameRemove: 'tags-input-component--tag-remove',
              }}
              validate={(tag: string) => {
                if (!String(tag) || String(tag).length > 12) {
                  return false;
                }
                return true;
              }}
              maxTags={12}
            />
          </div>
        </div>
      </section>

      <div data-color-mode={darkmode ? 'dark' : 'light'}>
        <MarkdownEditor
          value={state.currentNote.content}
          onChange={(value: string, viewUpdate) => {
            // viewUpdate.state.toJSON()
            dispatch({
              type: actions.CURRENT_NOTE,
              payload: {
                ...state,
                currentNote: { ...state.currentNote, content: String(value) },
              },
            });
          }}
          height={String(innerHeight + 'px')}
          placeholder={'Start writing a note...'}
          title='Start writing a note...'
          data-color-mode='light'
        />
      </div>
    </Container>
  );
};

export default EditorContainer;
