import { TNote, TSettings, TUser } from '@/types';
import actions from '@/data/actions';
import { FC, useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { NavigationDrawer } from '@/components/NavigationDrawer';
import { app_metadata } from '@/data/app-data';
import NotesList from '@/components/NotesList';
import { useAppContext } from '@/context/AppContext';
import EditorContainer from '@/components/EditorContainer';
import { _workspace as Container } from '@/styles/routes/_workspace';

const Workspace: FC = (): JSX.Element => {
  const { state, dispatch, fetchAPI } = useAppContext();
  const [queryStats, setQueryStats] = useState({
    isLoading: false,
    isError: false,
    error: null,
  });

  const getSettings = async (): Promise<void> => {
    try {
      const { data } = await fetchAPI<TSettings>({
        method: 'get',
        url: '/api/v1/settings',
      });

      dispatch({
        type: actions.SETTINGS,
        payload: { ...state, settings: { ...state.settings, ...data } },
      });
    } catch (error: any) {
      console.error(error?.response?.data?.message ?? error);
      dispatch({
        type: actions.TOAST,
        payload: {
          ...state,
          toast: {
            ...state.toast,
            title: 'Settings Sync Error',
            message:
              error?.response?.data?.message ??
              'Failed to fetch your settings data.',
            status: true,
            actionButtonMessage: 'Retry',
            handleFunction: getSettings,
          },
        },
      });
    }
  };

  const getUserData = async (): Promise<void> => {
    if (!state.auth.token ) return undefined;
    try {
      const { data } = await fetchAPI<TUser>({
        method: 'get',
        url: '/api/v1/users',
      });
      dispatch({
        type: actions.USER,
        payload: { ...state, user: { ...state.user, ...data } },
      });
    } catch (error: any) {
      console.error(error?.response?.data?.message ?? error);
      dispatch({
        type: actions.TOAST,
        payload: {
          ...state,
          toast: {
            ...state.toast,
            title: 'Account Data Sync Error',
            message:
              error?.response?.data?.message ??
              'Failed to fetch your account data.',
            status: true,
            actionButtonMessage: 'Retry',
            handleFunction: getUserData,
          },
        },
      });
    }
  };

  const getNotes = async (): Promise<void> => {
    const { search, sort } = state.query;
    try {
      const { data } = await fetchAPI<TNote[]>({
        method: 'get',
        url: `/api/v1/notes?${search ? `&search=${search}` : ''}${
          sort ? `&sort=${sort}` : ''
        }`,
      });

      dispatch({
        type: actions.NOTES,
        payload: { ...state, notes: [...data] },
      });
    } catch (error: any) {
      console.error(error?.response?.data?.message ?? error);
      setQueryStats({
        isLoading: false,
        isError: true,
        error: error,
      });
    }
  };

  useEffect((): (() => void) | void => {
    if (state.auth.token) {
      const timer = setTimeout(() => {
        getNotes();
      }, 500);
      return (): void => clearTimeout(timer);
    }
  }, [state.query, state.auth.token]);

  useEffect((): (() => void) | void => {
    if (state.auth.token) {
      const timer = setTimeout(() => {
        getSettings();
        getUserData()
      }, 500);
      return (): void => clearTimeout(timer);
    }
  }, [state.auth.token]);

  return (
    <Layout
      metadata={{
        title: `${app_metadata.appName} | ${state.auth.name} Workspace`,
        updatedAt: new Date().toISOString(),
      }}>
      <Container>
        <NavigationDrawer />
        {state.navigation.is_notes_list ? (
          <NotesList {...{ ...queryStats, refetch: getNotes }} />
        ) : null}
        {state.navigation.is_editor_container ? <EditorContainer /> : null}
      </Container>
    </Layout>
  );
};

export default Workspace;
