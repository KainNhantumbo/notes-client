import TagsEditor from './Tags';
import Priority from './Priority';
import StatusEditor from './Status';
import TogglePinNote from './PinNote';
import actions from '@/shared/actions';
import { m as motion } from 'framer-motion';
import { RiMenuLine } from 'react-icons/ri';
import { Tooltip } from 'react-tooltip';
import { useAppContext } from '@/context/AppContext';
import { _tools as Container } from '@/styles/modules/_tools';

export default function Tools() {
  const { state, dispatch } = useAppContext();

  return (
    <Container>
      <div className='form-container'>
        <input
          type='text'
          name='title'
          placeholder='Untitled'
          aria-label='Your note title'
          value={state.currentNote.title === 'Untitled' ? '' : state.currentNote.title}
          maxLength={115}
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

      <div className='extra-tools-container'>
        <div className='right-side-container'>
          <TogglePinNote />
          <Priority />
          <StatusEditor />
        </div>

        <div className='left-side-container'>
          <motion.button
            whileTap={{ scale: 0.8 }}
            data-tooltip-id='properties-drawer'
            data-tooltip-content='Open note properties drawer'
            className='trigger-left-panel-button'
            onClick={() => {
              dispatch({
                type: actions.PROPERTIES_DRAWER,
                payload: { ...state, isPropertiesDrawer: true }
              });
            }}>
            <RiMenuLine />
            <Tooltip
              classNameArrow='tooltip-border-class'
              className='tooltip-class'
              id='properties-drawer'
            />
          </motion.button>
        </div>
      </div>

      <div className='properties-container'>
        <TagsEditor />
      </div>
    </Container>
  );
}
