import TagsEditor from './Tags';
import Priority from './Priority';
import StatusEditor from './Status';
import TooglePinNote from './PinNote';
import actions from '@/shared/actions';
import { useAppContext } from '@/context/AppContext';
import { m as motion } from 'framer-motion';
import { _customTools as Container } from '@/styles/modules/_customTools';
import { RiMenuLine } from 'react-icons/ri';

export default function CustomTools() {
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
        <div className='right-side-container'>
          <TooglePinNote />
          <Priority />
          <StatusEditor />
        </div>

        <div className='left-side-container'>
          <motion.button
            whileTap={{ scale: 0.8 }}
            className='trigger-left-pannel-button'
            onClick={() => {
              dispatch({
                type: actions.PROPERTIES_DRAWER,
                payload: { ...state, isPropertiesDrawer: true }
              });
            }}>
            <RiMenuLine />
          </motion.button>
        </div>
      </div>

      <div className='properties-container'>
        <TagsEditor />
      </div>
    </Container>
  );
}
