import {
  RiApps2Line,
  RiMenuLine,
  RiMoreFill,
  RiPushpinFill,
  RiTimerFlashLine
} from 'react-icons/ri';
import {
  app_metadata,
  prioritiesDataMapping,
  statusDataMapping
} from '@/shared/data';
import actions from '@/shared/actions';
import { formatDate } from '@/libs/utils';
import { m as motion } from 'framer-motion';
import { MoonLoader } from 'react-spinners';
import { useTheme } from 'styled-components';
import { Layout } from '@/components/Layout';
import SortQuery from '@/components/SortQuery';
import { Note, Settings, User } from '@/types';
import { useQueries } from '@tanstack/react-query';
import { useAppContext } from '@/context/AppContext';
import React, { useEffect, JSX, useMemo } from 'react';
import { MixIcon, PlusIcon } from '@radix-ui/react-icons';
import NavigationDrawer from '@/components/NavigationDrawer';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { _workspace as Container } from '@/styles/routes/_workspace';
import About from '@/components/modals/About';

function Workspace(): JSX.Element {
  const theme = useTheme();
  const { state, dispatch, useFetchAPI } = useAppContext();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentTab = searchParams.get('tab')?.split('-')?.join(' ') || '';
  const isTrashFolder = currentTab === 'trash';

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
        url: '/api/v1/notes',
        data: { content: { type: 'doc', content: [] } }
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
      dispatch({
        type: actions.TOAST,
        payload: {
          ...state,
          toast: {
            ...state.toast,
            title: 'Data Sync Error',
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
  }, [userQuery, settingsQuery]);

  useEffect(() => {
    if (data) {
      dispatch({
        type: actions.NOTES,
        payload: { ...state, notes: [...data] }
      });
    }
  }, [data]);

  useEffect(() => {
    if (state.auth.token) {
      const timer = setTimeout(() => {
        refetch({ queryKey: ['query-notes'] });
      }, 500);
      return (): void => clearTimeout(timer);
    }
  }, [state.query]);

  const groupedNotes = useMemo(() => {
    const group = [
      {
        type: 'Pinned',
        data: state.notes.filter(
          (note) =>
            note.metadata.pinned && note.metadata.deleted === !isTrashFolder
        )
      },
      {
        type: 'All Notes',
        data: state.notes.filter(
          (note) =>
            !note.metadata.pinned && !note.metadata.deleted === !isTrashFolder
        )
      }
    ];
    return group;
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
  }, [state.notes]);

  return (
    <Layout
      metadata={{
        title: `${app_metadata.appName} | ${state.auth.name} Workspace`,
        updatedAt: new Date().toISOString()
      }}>
      <Container>
        <NavigationDrawer />
        <About/>

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
                        onClick={(e: any) => {
                          const isTarget =
                            e.target.classList.contains('action-panel');
                          if (!isTarget) handleEditNote(note);
                        }}>
                        <div className='top-side'>
                          <h3>
                            <RiMoreFill />
                            <span>
                              {note.title ? note.title : '[Untitled]'}
                            </span>
                          </h3>
                        </div>

                        {note.metadata.tags?.length > 0 ? (
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

                        <div className='bottom-side'>
                          {NoteAttributes.renderPriority(note)}
                          {NoteAttributes.renderStatus(note)}
                          <h5>{formatDate(note.updatedAt)}</h5>
                        </div>
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
      </Container>
    </Layout>
  );
}

export default React.memo(Workspace);

class NoteAttributes {
  static renderPriority(note: Note): JSX.Element {
    const [{ data, value }] = prioritiesDataMapping.filter(
      (attr) => attr.value === note.metadata.priority
    );

    return (
      <div className='priority-container'>
        <RiTimerFlashLine color={data.color} className='dot-icon' />
        {value === 'none' ? (
          <span>Normal priority</span>
        ) : (
          <span>{data.label} Priority</span>
        )}
      </div>
    );
  }

  static renderStatus(note: Note): JSX.Element {
    const [{ data }] = statusDataMapping.filter(
      (item) => item.value === note.metadata.status
    );

    return (
      <div className='status-container'>
        <data.icon color={data.color} className='dot-icon' />
        {note.metadata.status === 'none' ? (
          <span>Normal status</span>
        ) : (
          <span>Currently {data.label}</span>
        )}
      </div>
    );
  }

  static getNoteTemplate(): Note {
    return {
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
  }
}
