import {
  FileTextIcon,
  HamburgerMenuIcon,
  MixIcon,
  PlusIcon,
  TrashIcon
} from '@radix-ui/react-icons';
import { Note, Settings, User } from '@/types';
import { useEffect } from 'react';
import actions from '@/shared/actions';
import { Layout } from '@/components/Layout';
import { m as motion } from 'framer-motion';
import { formatDate } from '@/libs/utils';
import { MoonLoader } from 'react-spinners';
import { useTheme } from 'styled-components';
import { useQueries } from '@tanstack/react-query';
import { NavigationDrawer } from '@/components/NavigationDrawer';
import { app_metadata } from '@/shared/data';
import { useAppContext } from '@/context/AppContext';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { _workspace as Container } from '@/styles/routes/_workspace';
import SortQuery from '@/components/SortQuery';
import NoteActionsDropdown from '@/components/NoteActionsDropdown';

export default function Workspace() {
  const { state, dispatch, useFetchAPI } = useAppContext();
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const noteTemplate: Note = {
    _id: '',
    title: '',
    content: {},
    created_by: '',
    metadata: {
      folder_id: '',
      deleted: false,
      pinned: false,
      status: 'none',
      priority: 'none',
      tags: []
    },
    updatedAt: '',
    createdAt: ''
  };

  const [notesQuery, settingsQuery, userQuery] = useQueries({
    queries: [
      { queryFn: getNotes, queryKey: ['query-notes'] },
      { queryFn: getSettings, queryKey: ['query-settings'] },
      { queryFn: getUser, queryKey: ['query-user'] }
    ]
  });

  const { isError, isLoading, error, data, refetch } = notesQuery;

  async function getUser() {
    try {
      const { data } = await useFetchAPI<User>({
        method: 'get',
        url: '/api/v1/users'
      });
      return data;
    } catch (error: any) {
      console.error(error?.response?.data?.message || error);
    }
  }

  async function getSettings() {
    try {
      const { data } = await useFetchAPI<Settings>({
        method: 'get',
        url: '/api/v1/settings'
      });
      return data;
    } catch (error: any) {
      console.error(error?.response?.data?.message || error);
    }
  }

  async function getNotes() {
    const queryParams = new URLSearchParams(state.query).toString();
    try {
      const { data } = await useFetchAPI<Note[]>({
        method: 'get',
        url: `/api/v1/notes?${queryParams}`
      });
      return data;
    } catch (error: any) {
      console.error(error?.response?.data?.message || error);
    }
  }

  async function createNote() {
    if (!state.auth.token) return undefined;
    try {
      const { data } = await useFetchAPI<Note>({
        method: 'post',
        url: '/api/v1/notes'
      });
      dispatch({
        type: actions.CURRENT_NOTE,
        payload: { ...state, currentNote: { ...noteTemplate, ...data } }
      });
      navigate(`/workspace/note-editor/${data._id}`);
    } catch (error: any) {
      console.error(error?.response?.data?.message || error);
      dispatch({
        type: actions.TOAST,
        payload: {
          ...state,
          toast: {
            ...state.toast,
            title: 'Note Sync Error',
            message:
              error?.response?.data?.message ||
              'Failed to create your note. Check your internet connection and try again',
            status: true,
            actionButtonMessage: 'Retry',
            handleFunction: createNote
          }
        }
      });
    }
  }

  function handleEditNote(data: Note) {
    dispatch({
      type: actions.CURRENT_NOTE,
      payload: { ...state, currentNote: { ...data } }
    });
    navigate(`/workspace/note-editor/${data._id}`);
  }

  useEffect(() => {
    if (settingsQuery.isError || userQuery.isError) {
      return dispatch({
        type: actions.TOAST,
        payload: {
          ...state,
          toast: {
            ...state.toast,
            title: 'Initial Data Sync Error',
            message: 'Failed to fetch your settings and user account data.',
            status: true,
            actionButtonMessage: 'Retry',
            handleFunction: () => {
              settingsQuery.refetch({ queryKey: ['query-settings'] });
              userQuery.refetch({ queryKey: ['query-user'] });
            }
          }
        }
      });
    }

    if (userQuery.data && settingsQuery.data) {
      dispatch({
        type: actions.USER,
        payload: { ...state, user: { ...state.user, ...userQuery.data } }
      });
      dispatch({
        type: actions.SETTINGS,
        payload: {
          ...state,
          settings: { ...state.settings, ...settingsQuery.data }
        }
      });
    }
  }, [userQuery, settingsQuery]);

  useEffect(() => {
    if (data) {
      dispatch({
        type: actions.NOTES,
        payload: { ...state, notes: [...data] }
      });
    }
  }, [data]);

  useEffect((): (() => void) | void => {
    if (state.auth.token) {
      const timer = setTimeout(() => {
        refetch({ queryKey: ['query-notes'] });
      }, 500);
      return (): void => clearTimeout(timer);
    }
  }, [state.query]);

  return (
    <Layout
      metadata={{
        title: `${app_metadata.appName} | ${state.auth.name} Workspace`,
        updatedAt: new Date().toISOString()
      }}>
      <Container>
        <NavigationDrawer />

        <section className='notes-renderer-container'>
          <section className='header-container'>
            <h2>
              <span>
                {searchParams.get('tab')?.split('-').join(' ') ?? 'Workspace'}
              </span>
            </h2>

            <div className='form-container'>
              <motion.button
                title='Toggle navigation drawer'
                placeholder='Toggle navigation drawer'
                aria-placeholder='Toggle navigation drawer'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
                onClick={() =>
                  dispatch({
                    type: actions.NAVIGATION_DRAWER,
                    payload: {
                      ...state,
                      isNavigationDrawer: !state.isNavigationDrawer
                    }
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
                      query: { ...state.query, search: e.target.value }
                    }
                  })
                }
              />
              <SortQuery />
            </div>

            {!isError && !isLoading ? (
              <motion.button
                title='Compose a new note'
                placeholder='Compose a new note'
                aria-placeholder='Compose a new note'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.8 }}
                className='compose-button'
                onClick={createNote}>
                <PlusIcon />
              </motion.button>
            ) : null}
          </section>

          <hr className='header-hr' />

          {state.notes.length > 0 && !isLoading && !isError ? (
            <div className='wrapper-container'>
              <ScrollArea.Root className='notes-list-container'>
                <ScrollArea.Viewport className='ScrollAreaViewport'>
                  {state.notes
                    .filter((note) => !note.metadata.deleted)
                    .map((note) => (
                      <div
                        key={note._id}
                        className={`note-container`}
                        onClick={(e: any) => {
                          const isTarget =
                            e.target.classList.contains('action-panel');
                          if (!isTarget) handleEditNote(note);
                        }}>
                        <div className='top-side'>
                          <h3>
                            <FileTextIcon />
                            <span>
                              {note.title ? note.title : '[Untitled]'}
                            </span>
                          </h3>
                        </div>

                        <div className='bottom-side'>
                          {note.metadata.tags.length > 0 ? (
                            <div className='tags-container'>
                              {note.metadata.tags.map((tag) => (
                                <p
                                  key={tag.id}
                                  style={{ backgroundColor: tag.color }}>
                                  {tag.value}
                                </p>
                              ))}
                            </div>
                          ) : null}
                          <h5>{formatDate(note.updatedAt)}</h5>
                        </div>

                        <NoteActionsDropdown
                          items={[
                            {
                              label: 'Pi',
                              icon: TrashIcon,
                              handler: () => {}
                            },
                            {
                              label: 'Move to Trash',
                              icon: TrashIcon,
                              handler: () => {}
                            }
                          ]}
                        />
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
            </div>
          ) : null}

          {!isLoading && isError ? (
            <section className='error-container'>
              <h3>
                {(error as any)?.response?.data?.message ||
                  (error as any)?.code ||
                  'An error occurred while fetching data'}
              </h3>
              <button onClick={() => refetch({ queryKey: ['query-notes'] })}>
                <span>Try again</span>
              </button>
            </section>
          ) : null}

          {state.notes.length < 1 && !isError && !isLoading ? (
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

          {isLoading && !isError ? (
            <div className='loading-indicator'>
              <MoonLoader
                size={30}
                color={`rgb(${theme.primary_shade})`}
                aria-placeholder='Loading your notes...'
                cssOverride={{
                  display: 'block'
                }}
              />
              <h3>Loading your notes...</h3>
            </div>
          ) : null}
        </section>
      </Container>
    </Layout>
  );
}
