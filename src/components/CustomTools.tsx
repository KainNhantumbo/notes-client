import {
  BookmarkFilledIcon,
  BookmarkIcon,
  MixerHorizontalIcon,
} from '@radix-ui/react-icons';
import { Tag } from '@/types';
import { useState } from 'react';
import actions from '@/shared/actions';
import { m as motion } from 'framer-motion';
import { TwitterPicker } from 'react-color';
import { colorsOptions } from '../shared/data';
import { useAppContext } from '@/context/AppContext';
import { _customTools as Container } from '@/styles/modules/_customTools';

export function CustomTools() {
  const { state, dispatch, fetchAPI } = useAppContext();
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);

  const handleAddTag = (tags: Tag[]): void => {
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
        {/* <button
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
                    bookmarked: !state.currentNote.metadata.bookmarked,
                  },
                },
              },
            })
          }>
          {state.currentNote.metadata.bookmarked ? (
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
        </button> */}

        {/* <div className='priority-selector'></div>
        <div className='status-selector'></div> */}

        {/* <div
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
        </div> */}
        {/* <div className='tags-container'></div> */}
      </div>
    </Container>
  );
}
