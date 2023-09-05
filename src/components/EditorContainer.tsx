import 'react-tagsinput/react-tagsinput.css';

import {
  BookmarkFilledIcon,
  BookmarkIcon,
  MixerHorizontalIcon,
} from '@radix-ui/react-icons';
import { Editor } from './Editor';
import { FC, useState } from 'react';
import actions from '../data/actions';
import TagsInput from 'react-tagsinput';
import { m as motion } from 'framer-motion';
import { TwitterPicker } from 'react-color';
import { colorsOptions } from '../data/app-data';
import { useAppContext } from '../context/AppContext';
import { _editor as Container } from '@/styles/modules/_editor';

const EditorContainer: FC = (): JSX.Element => {
  const { state, dispatch, fetchAPI } = useAppContext();
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);

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
                <BookmarkFilledIcon />
                <span>Bookmarked</span>
              </>
            ) : (
              <>
                <BookmarkIcon />
                <span>Bookmark</span>
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
              onChange={handleChangeTag}
              value={state.currentNote.metadata.tags}
              onlyUnique={true}
              maxTags={12}
              validate={(tag: string) => {
                if (!String(tag) || String(tag).length > 12) {
                  return false;
                }
                return true;
              }}
            />
          </div>
        </div>
      </section>

      <Editor />
    </Container>
  );
};

export default EditorContainer;
