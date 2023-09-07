import { TNote } from '@/@types';
import actions from '@/data/actions';
import { FC, useEffect } from 'react';
import Layout from '@/components/Layout';
import { NavigationDrawer } from '@/components/NavigationDrawer';
import { useQuery } from '@tanstack/react-query';
import { app_metadata } from '@/data/app-data';
import NotesList from '@/components/NotesList';
import { useAppContext } from '@/context/AppContext';
import EditorContainer from '@/components/EditorContainer';
import { _workspace as Container } from '@/styles/routes/_workspace';

const Workspace: FC = (): JSX.Element => {
  const { state, dispatch, fetchAPI } = useAppContext();

  const getNotes = async (): Promise<TNote[]> => {
    const { search, sort } = state.query;
    const { data } = await fetchAPI<TNote[]>({
      method: 'get',
      url: `/api/v1/notes?${search ? `&search=${search}` : ''}${
        sort ? `&sort=${sort}` : ''
      }`,
    });
    return [...data];
  };

  const { error, data, refetch, isLoading, isError } = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
  });

  useEffect((): (() => void) => {
    if (data) {
      dispatch({
        type: actions.NOTES,
        payload: { ...state, notes: [...data] },
      });
    }

    return (): void => {
      dispatch({
        type: actions.NOTES,
        payload: { ...state, notes: [] },
      });
    };
  }, [data]);

  useEffect((): (() => void) => {
    const timer = setTimeout(() => {
      refetch({ queryKey: ['notes'] });
    }, 500);
    return (): void => clearTimeout(timer);
  }, [state.query]);

  return (
    <Layout
      renderHeader
      metadata={{
        title: `${app_metadata.appName} | ${state.auth.name} Workspace`,
        updatedAt: new Date().toISOString(),
      }}>
      <Container>
        {/* <NavigationDrawer/> */}
        <NotesList {...{ isError, isLoading, error, refetch }} />
        <EditorContainer />
      </Container>
    </Layout>
  );
};

export default Workspace;
