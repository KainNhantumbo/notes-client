import {
  CaretSortIcon,
  HamburgerMenuIcon,
  MixIcon,
  Pencil2Icon,
} from '@radix-ui/react-icons';
import { FC } from 'react';
import actions from '../data/actions';
import { m as motion } from 'framer-motion';
import { formatDate } from '@/libs/utils';
import { useAppContext } from '../context/AppContext';
import { TNote } from '@/types';
import { useSearchParams } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import { DefaultTheme, useTheme } from 'styled-components';
import { _notesList as Container } from '@/styles/modules/_notes-list';
import * as ScrollArea from '@radix-ui/react-scroll-area';

interface IProps {
  isLoading: boolean;
  isError: boolean;
  error: any;
  refetch: () => Promise<void>;
}

const NotesList: FC<IProps> = (props): JSX.Element => {
  const theme: DefaultTheme = useTheme();
  const { state, dispatch, fetchAPI } = useAppContext();
  let [searchParams] = useSearchParams();

  const createNote = async (): Promise<void> => {
    if (!state.auth.token) return undefined;
    try {
      const { data } = await fetchAPI<any>({
        method: 'post',
        url: '/api/v1/notes',
        data: {},
      });

      dispatch({
        type: actions.CURRENT_NOTE,
        payload: { ...state, currentNote: data },
      });

      // @ts-ignore
      dispatch({
        type: actions.NOTES,
        payload: {
          ...state,
          notes: [
            {
              _id: '',
              title: '',
              content: ``,
              created_by: '',
              metadata: {
                folder_id: '',
                color: '',
                deleted: false,
                bookmarked: false,
                status: 'none',
                priority: 'none',
                reminder: { time: '', expired: false },
                tags: [],
              },
              updatedAt: '',
              createdAt: '',
              ...data,
            },
            ...state.notes,
          ],
        },
      });
    } catch (error: any) {
      console.error(error?.response?.data?.message ?? error);
      dispatch({
        type: actions.TOAST,
        payload: {
          ...state,
          toast: {
            ...state.toast,
            title: 'Note Sync Error',
            message:
              error?.response?.data?.message ??
              'Failed to create your note. Check your internet connection and try again',
            status: true,
            actionButtonMessage: 'Retry',
            handleFunction: createNote,
          },
        },
      });
    }
  };

  return (
    <Container>
      <section className='header-container'>
        <h2>
          <span>
            {searchParams.get('tab')?.split('-').join(' ') ?? 'Workspace'}
          </span>
        </h2>

        <div className='form-container'>
          <motion.button
            title='open navigation drawer'
            placeholder='open navigation drawer'
            aria-placeholder='open navigation drawer'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.8 }}
            onClick={() =>
              dispatch({
                type: actions.NAVIGATION,
                payload: {
                  ...state,
                  navigation: {
                    ...state.navigation,
                    is_navigation_drawer: true,
                  },
                },
              })
            }>
            <HamburgerMenuIcon />
          </motion.button>

          <input
            type='search'
            name='search'
            placeholder='Search in notes'
            title='Search in notes'
            aria-placeholder='Search in notes'
            value={state.query.search}
            onChange={(e) =>
              dispatch({
                type: actions.QUERY_NOTES,
                payload: {
                  ...state,
                  query: { ...state.query, search: e.target.value },
                },
              })
            }
          />

          <motion.button
            title='Sort notes'
            placeholder='Sort notes'
            aria-placeholder='Sort notes'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.8 }}
            onClick={() =>
              dispatch({
                type: actions.QUERY_NOTES,
                payload: { ...state, query: { ...state.query, sort: '' } },
              })
            }>
            <CaretSortIcon />
          </motion.button>
        </div>
      </section>

      {state.notes.length > 0 && !props.isLoading && !props.isError ? (
        <>
          <ScrollArea.Root className='notes-list-container'>
            <ScrollArea.Viewport className='ScrollAreaViewport'>
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
                        currentNote: { ...note },
                      },
                    });
                  }}>
                  <h3>
                    <span>{note.title ? note.title : '[Untitled]'}</span>
                  </h3>
                  <p>
                    {note?.content ? note.content.slice(0, 40) : '[Empty note]'}
                  </p>
                  {note.metadata.tags.length > 0 ? (
                    <div className='tags-container'>
                      {note.metadata.tags.map((tag) => (
                        <span
                          style={{ backgroundColor: tag.color }}
                          key={tag.value}>
                          {tag.value}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <span>{formatDate(note.updatedAt)}</span>
                </div>
              ))}
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              className='ScrollAreaScrollbar'
              orientation='vertical'>
              <ScrollArea.Thumb className='ScrollAreaThumb' />
            </ScrollArea.Scrollbar>
            <ScrollArea.Scrollbar
              className='ScrollAreaScrollbar'
              orientation='horizontal'>
              <ScrollArea.Thumb className='ScrollAreaThumb' />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner className='ScrollAreaCorner' />
          </ScrollArea.Root>
        </>
      ) : null}

      {!props.isLoading && props.isError ? (
        <section className='error-container'>
          <h3>
            {(props.error as any)?.response?.data?.message ||
              (props.error as any)?.code ||
              'An error occurred while fetching data'}
          </h3>
          <button onClick={() => props.refetch()}>
            <span>Try again</span>
          </button>
        </section>
      ) : null}

      {!props.isError && !props.isLoading ? (
        <motion.button
          title='Compose a new note'
          placeholder='Compose a new note'
          aria-placeholder='Compose a new note'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.8 }}
          className='compose-button'
          onClick={createNote}>
          <Pencil2Icon />
        </motion.button>
      ) : null}

      {state.notes.length < 1 && !props.isError && !props.isLoading ? (
        <section className='empty-notes-container'>
          <MixIcon />
          <h3>
            <span>No notes</span>
          </h3>
          <p>
            Press <i>Compose</i> button to start writing notes
          </p>
        </section>
      ) : null}

      {props.isLoading && !props.isError ? (
        <div className='loading-indicator'>
          <MoonLoader
            size={30}
            color={`rgb(${theme.primary_shade})`}
            aria-placeholder='Loading your notes...'
            cssOverride={{
              display: 'block',
            }}
          />
          <h3>Loading your notes...</h3>
        </div>
      ) : null}
    </Container>
  );
};

export default NotesList;
