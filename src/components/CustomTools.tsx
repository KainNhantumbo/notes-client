import {
  BookmarkFilledIcon,
  BookmarkIcon,
  MixerHorizontalIcon
} from '@radix-ui/react-icons';
import { Tag } from '@/types';
import { useState } from 'react';
import Priority from './Priority';
import actions from '@/shared/actions';
import { m as motion } from 'framer-motion';
import { TwitterPicker } from 'react-color';
import TagsEditor from './Tags';
import { colorsOptions } from '../shared/data';
import { useAppContext } from '@/context/AppContext';
import { _customTools as Container } from '@/styles/modules/_customTools';
import TooglePinNote from './PinNote';

export function CustomTools() {
  const { state, dispatch } = useAppContext();

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
                currentNote: { ...state.currentNote, title: e.target.value }
              }
            })
          }
        />
      </div>

      <div className='metadata-modifiers-container'>
        <TooglePinNote />
        <Priority />
      </div>

      <div className='properties-container'>
        <TagsEditor />

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
