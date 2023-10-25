import {
  RiApps2Line,
  RiDeleteBin2Line,
  RiDeleteBin6Line,
  RiLoopLeftLine,
  RiMenuLine,
  RiMoreFill,
  RiPushpinFill,
  RiTimerFlashLine
} from 'react-icons/ri';
import { app_metadata, prioritiesMap, statusMap } from '@/shared/data';
import actions from '@/shared/actions';
import { formatDate } from '@/libs/utils';
import { m as motion } from 'framer-motion';
import { MoonLoader } from 'react-spinners';
import { useTheme } from 'styled-components';
import { Layout } from '@/components/Layout';
import SortQuery from '@/components/SortQuery';
import { Note, Settings, User } from '@/types';
import About from '@/components/modals/About';
import { useQueries } from '@tanstack/react-query';
import { useAppContext } from '@/context/AppContext';
import { useEffect, JSX, useMemo } from 'react';
import { MixIcon, PlusIcon } from '@radix-ui/react-icons';
import NavigationDrawer from '@/components/NavigationDrawer';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { _workspace as Container } from '@/styles/routes/_workspace';

export default function Workspace(): JSX.Element {
  const theme = useTheme();
  const { state, dispatch, useFetchAPI } = useAppContext();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentTab = searchParams.get('tab')?.split('-')?.join(' ') || '';
  const isTrashTab = currentTab === 'trash';

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
      dispatch({
        type: actions.USER,
        payload: { ...state, user: { ...state.user, ...data } }
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
      dispatch({
        type: actions.SETTINGS,
        payload: { ...state, settings: { ...state.settings, ...data } }
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
        payload: {
          ...state,
          currentNote: { ...NoteAttributes.getNoteTemplate(), ...data }
        }
      });
      navigate(`/workspace/note-editor/${data._id}`);
    } catch (error: any) {
      console.error(error?.response?.data?.message || error);
      dispatch({
        type: actions.TOAST,
        payload: {
          ...state,
          toast: {
            title: 'Note Sync Error',
            message:
              error?.response?.data?.message ||
              'Failed to create your note. Check your internet connection and try again.',
            status: true,
            actionButtonMessage: 'Retry',
            handleFunction: createNote
          }
        }
      });
    }
  }

  const restoreNoteFromTrash = (noteId: string) => {
    dispatch({
      type: actions.PROMPT,
      payload: {
        ...state,
        prompt: {
          title: 'Restore Note',
          message: 'Do you really want to restore this note?',
          status: true,
          actionButtonMessage: 'Restore',
          handleFunction: async () => {
            try {
              const [foundNote] = state.notes.filter(
                (note) => note._id === noteId
              );
              const { _id, ...data } = foundNote;
              await useFetchAPI({
                method: 'patch',
                url: `/api/v1/notes/${_id}`,
                data: { ...data, deleted: false }
              });

              dispatch({
                type: actions.PROMPT,
                payload: {
                  ...state,
                  prompt: { ...state.prompt, status: false }
                }
              });
              dispatch({
                type: actions.TOAST,
                payload: {
                  ...state,
                  toast: {
                    status: true,
                    title: 'Notes Sync',
                    message: 'Your note was restored from trash successfully!',
                    closeOnDelay: true
                  }
                }
              });
              refetch({ queryKey: ['query-notes'] });
            } catch (error: any) {
              console.error(error?.response?.data?.message || error);
              dispatch({
                type: actions.TOAST,
                payload: {
                  ...state,
                  toast: {
                    title: 'Note Sync Error',
                    message:
                      error?.response?.data?.message ||
                      'Failed to restore your note from trash. Check your internet connection and try again.',
                    status: true,
                    actionButtonMessage: 'Retry',
                    handleFunction: restoreNoteFromTrash
                  }
                }
              });
            }
          }
        }
      }
    });
  };

  const deleteNoteFromTrash = (noteId: string) => {
    dispatch({
      type: actions.PROMPT,
      payload: {
        ...state,
        prompt: {
          title: 'Delete Note',
          message:
            'Do you really want to permanently delete this note from the trash? This action cannot be undone.',
          status: true,
          actionButtonMessage: 'Delete',
          handleFunction: async () => {
            try {
              const [foundNote] = state.notes.filter(
                (note) => note._id === noteId
              );
              const { _id, ...data } = foundNote;
              await useFetchAPI({
                method: 'delete',
                url: `/api/v1/notes/${_id}`,
                data: { ...data, deleted: false }
              });

              dispatch({
                type: actions.PROMPT,
                payload: {
                  ...state,
                  prompt: { ...state.prompt, status: false }
                }
              });
              dispatch({
                type: actions.TOAST,
                payload: {
                  ...state,
                  toast: {
                    status: true,
                    title: 'Notes Sync',
                    message: 'Your note was deleted from trash successfully!',
                    closeOnDelay: true
                  }
                }
              });
              refetch({ queryKey: ['query-notes'] });
            } catch (error: any) {
              console.error(error?.response?.data?.message || error);
              dispatch({
                type: actions.TOAST,
                payload: {
                  ...state,
                  toast: {
                    title: 'Note Sync Error',
                    message:
                      error?.response?.data?.message ||
                      'Failed to delete your note from trash. Check your internet connection and try again.',
                    status: true,
                    actionButtonMessage: 'Retry',
                    handleFunction: deleteNoteFromTrash
                  }
                }
              });
            }
          }
        }
      }
    });
  };

  function handleEditNote(data: Note) {
    dispatch({
      type: actions.CURRENT_NOTE,
      payload: { ...state, currentNote: { ...data } }
    });
    navigate(`/workspace/note-editor/${data._id}`);
  }

  useEffect(() => {
    if (settingsQuery.isError || userQuery.isError) {
      dispatch({
        type: actions.TOAST,
        payload: {
          ...state,
          toast: {
            title: 'Data Sync Error',
            message:
              'Failed to fetch your settings and user account data. You must be logged in and have a good internet connection.',
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
  }, [userQuery, settingsQuery]);

  useEffect(() => {
    if (data) {
      dispatch({
        type: actions.NOTES,
        payload: { ...state, notes: [...data] }
      });
    }
  }, [data, searchParams]);

  useEffect(() => {
    if (state.auth.token) {
      const timer = setTimeout(() => {
        refetch({ queryKey: ['query-notes'] });
      }, 500);
      return (): void => clearTimeout(timer);
    }
  }, [state.query]);

  const groupedNotes = useMemo(() => {
    const queryObj = searchParams.get('folder');

    return [
      {
        type: 'Pinned',
        data: state.notes.filter(
          (note) => note.pinned && !note.deleted === !isTrashTab
        )
      },
      {
        type: 'All Notes',
        data: state.notes.filter(
          (note) => !note.pinned && !note.deleted === !isTrashTab
        )
      }
    ];
  }, [state.notes, searchParams]);

  const hasNotes = useMemo(() => {
    return (
      groupedNotes
        .map((item) => item.data)
        .reduce((acc, curr) => {
          const data = acc.concat(curr);
          return data;
        }, []).length > 0
    );
  }, [state.notes, searchParams]);

  return (
    <Layout
      metadata={{
        title: `${app_metadata.appName} | ${state.auth.name} Workspace`,
        updatedAt: new Date().toISOString()
      }}>
      <Container>
        <NavigationDrawer />
        <About />

        <section className='header-container'>
          <h2>
            <span>
              {searchParams.get('tab')?.split('-')?.join(' ') ?? 'Workspace'}
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
              <RiMenuLine />
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

            {!isError && !isLoading && !isTrashTab ? (
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
          </div>
        </section>

        {hasNotes && !isLoading && !isError ? (
          <div className='wrapper-container'>
            {groupedNotes.map(({ type, data }) =>
              data.length > 0 ? (
                <div key={type} className='groups-container'>
                  <h3 className='group-title'>
                    {type === 'Pinned' ? <RiPushpinFill /> : <RiApps2Line />}
                    <span>{type}</span>
                  </h3>

                  <section className='notes-container'>
                    {data.map((note, index) => (
                      <motion.div
                        key={note._id}
                        className={`note-container`}
                        initial={{ scale: 0, opacity: 0, y: 50 }}
                        animate={{
                          scale: 1,
                          opacity: 1,
                          y: 0,
                          transition: { delay: index * 0.2 }
                        }}
                        whileHover={{
                          boxShadow: `0px 12px 25px rgba(${theme.black}, .1)`
                        }}
                        onClick={() => {
                          if (!note.deleted) handleEditNote(note);
                        }}>
                        <div className='top-side'>
                          <h3>
                            <RiMoreFill />
                            <span>
                              {note.title ? note.title : '[Untitled]'}
                            </span>
                          </h3>
                        </div>

                        {note.tags.length > 0 ? (
                          <div className='tags-container'>
                            {note.tags.map((tag) => (
                              <p
                                key={tag.id}
                                style={{ backgroundColor: tag.color }}>
                                {tag.value}
                              </p>
                            ))}
                          </div>
                        ) : null}

                        <div className='bottom-side'>
                          {NoteAttributes.renderPriority(note)}
                          {NoteAttributes.renderStatus(note)}
                          <h5>{formatDate(note.updatedAt)}</h5>
                        </div>
                        {note.deleted ? (
                          <div className='note-actions-container'>
                            <button
                              onClick={() => restoreNoteFromTrash(note._id)}>
                              <RiLoopLeftLine />
                              <span>Restore</span>
                            </button>
                            <button
                              onClick={() => deleteNoteFromTrash(note._id)}>
                              <RiDeleteBin2Line />
                              <span>Delete</span>
                            </button>
                          </div>
                        ) : null}
                      </motion.div>
                    ))}
                  </section>
                </div>
              ) : null
            )}
          </div>
        ) : null}

        {!isLoading && isError ? (
          <section className='error-container'>
            <div>
              <h3>
                {(error as any)?.response?.data?.message ||
                  (error as any)?.code ||
                  'An error occurred while fetching data'}
              </h3>
              <button onClick={() => refetch({ queryKey: ['query-notes'] })}>
                <span>Try again</span>
              </button>
            </div>
          </section>
        ) : null}

        {!hasNotes && !isTrashTab && !isError && !isLoading ? (
          <section className='empty-notes-container'>
            <div>
              <MixIcon />
              <h3>
                <span>No notes</span>
              </h3>
              <p>
                Press <i>Compose</i> button to start writing notes
              </p>
            </div>
          </section>
        ) : null}

        {!hasNotes && isTrashTab && !isError && !isLoading ? (
          <section className='empty-notes-container'>
            <div>
              <RiDeleteBin6Line />
              <h3>
                <span>Trash</span>
              </h3>
              <p>Lucky!! No notes in trash to be displayed.</p>
            </div>
          </section>
        ) : null}

        {isLoading && !isError ? (
          <div className='loading-indicator'>
            <div className='loader-content'>
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
          </div>
        ) : null}
      </Container>
    </Layout>
  );
}

class NoteAttributes {
  static renderPriority(note: Note): JSX.Element {
    const [{ data, value }] = prioritiesMap.filter(
      (attr) => attr.value === note.priority
    );

    return (
      <div className='priority-container'>
        <RiTimerFlashLine color={data.color} className='dot-icon' />
        {value === 'none' ? (
          <span>
            Normal<i> priority</i>
          </span>
        ) : (
          <span>
            {data.label}
            <i> Priority</i>
          </span>
        )}
      </div>
    );
  }

  static renderStatus(note: Note): JSX.Element {
    const [{ data }] = statusMap.filter((item) => item.value === note.status);

    return (
      <div className='status-container'>
        <data.icon color={data.color} className='dot-icon' />
        {note.status === 'none' ? (
          <span>
            <i>Normal </i>status
          </span>
        ) : (
          <span>
            <i>Currently </i>
            {data.label}
          </span>
        )}
      </div>
    );
  }

  static getNoteTemplate(): Note {
    return {
      _id: '',
      title: '',
      content: '',
      created_by: '',
      folder_id: '',
      deleted: false,
      pinned: false,
      status: 'none',
      priority: 'none',
      tags: [],
      updatedAt: '',
      createdAt: ''
    };
  }
}
