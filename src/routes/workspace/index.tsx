import { TNote } from '@/types';
import actions from '@/shared/actions';
import { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { NavigationDrawer } from '@/components/NavigationDrawer';
import { app_metadata } from '@/shared/data';
import { NotesList } from '@/components/NotesList';
import { useAppContext } from '@/context/AppContext';
import { _workspace as Container } from '@/styles/routes/_workspace';

export default function Workspace() {
  const { state, dispatch, fetchAPI } = useAppContext();
  const [queryStats, setQueryStats] = useState({
    isLoading: false,
    isError: false,
    error: null,
  });

  async function getNotes() {
    const { search, sort } = state.query;
    setQueryStats((data) => ({ ...data, isLoading: true }));
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
      setQueryStats((data) => ({ ...data, isLoading: false }));
    } catch (error: any) {
      console.error(error?.response?.data?.message ?? error);
      setQueryStats({
        isLoading: false,
        isError: true,
        error: error,
      });
    }
  }

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
      </Container>
    </Layout>
  );
}
