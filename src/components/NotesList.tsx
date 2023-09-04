import {
  AvatarIcon,
  DotsHorizontalIcon,
  HamburgerMenuIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons';
import { FC } from 'react';
import actions from '../data/actions';
import { formatDate } from '@/libs/utils';
import { useAppContext } from '../context/AppContext';
import { _notesList as Container } from '@/styles/modules/_notes-list';

const NotesList: FC = (): JSX.Element => {
  const { state, dispatch } = useAppContext();

  return (
    <Container>
      <section className='header-container'>
        <h2>
          <span>All Notes</span>
        </h2>

        <div className='form-container'>
          <button
            title='open navigation drawer'
            placeholder='open navigation drawer'
            aria-placeholder='open navigation drawer'
            onClick={() => {}}>
            <HamburgerMenuIcon />
          </button>
          <div className='search-container'>
            <MagnifyingGlassIcon />
            <input
              type='search'
              placeholder='Search in notes'
              title='Search in notes'
              aria-placeholder='Search in notes'
              value={''}
              onChange={() => {}}
            />
          </div>
          <button className='avatar-container'>
            {state.auth.profile_image ? (
              <img
                loading='lazy'
                decoding='async'
                src={state.auth.profile_image}
                alt='User profile image'
              />
            ) : (
              <AvatarIcon />
            )}
          </button>
        </div>
      </section>
      {state.notes.length > 0 ? (
        <section className='notes-container'>
          {state.notes.map((note) => (
            <div
              key={note._id}
              className={`note-container ${
                note._id === state.currentNote._id ? 'selected-note' : ''
              }`}
              onClick={() => {
                dispatch({
                  type: actions.CURRENT_NOTE,
                  payload: {
                    ...state,
                    currentNote: { ...state.currentNote, ...note },
                  },
                });
              }}>
              <h3>
                <span>{note.title}</span>
              </h3>
              <p>{note.content.slice(0, 40)}</p>
              {note.metadata.tags.length > 0 ? (
                <div className='tags-container'>
                  {note.metadata.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              ) : null}
              <span>{formatDate(note.updatedAt)}</span>
            </div>
          ))}
          {state.notes.length > 0 && (
            <div className='container-items__end-mark'>
              <DotsHorizontalIcon />
            </div>
          )}
        </section>
      ) : null}
    </Container>
  );
};

export default NotesList;
