import TagsEditor from './Tags';
import Priority from './Priority';
import StatusEditor from './Status';
import TooglePinNote from './PinNote';
import actions from '@/shared/actions';
import { useAppContext } from '@/context/AppContext';
import { _customTools as Container } from '@/styles/modules/_customTools';

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

        </div>
      </div>

      <div className='properties-container'>
        <TagsEditor />
      </div>
    </Container>
  );
}
