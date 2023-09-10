import { TNote } from '@/types';
import actions from '@/data/actions';
import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { NavigationDrawer } from '@/components/NavigationDrawer';
import { app_metadata } from '@/data/app-data';
import { NotesList } from '@/components/NotesList';
import { useAppContext } from '@/context/AppContext';
import EditorContainer from '@/components/EditorContainer';
import { _workspace as Container } from '@/styles/routes/_workspace';

export function Workspace() {
  const { state, dispatch, fetchAPI } = useAppContext();
  const [queryStats, setQueryStats] = useState({
    isLoading: false,
    isError: false,
    error: null,
  });

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
}
