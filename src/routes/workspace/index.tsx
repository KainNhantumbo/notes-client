import { FC } from 'react';
import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';
import EditorContainer from '@/components/EditorContainer';
import { app_metadata } from '@/data/app-data';
import NotesList from '@/components/NotesList';
import { useAppContext } from '@/context/AppContext';
import { _workspace as Container } from '@/styles/routes/_workspace';

const Workspace: FC = (): JSX.Element => {
  const { state } = useAppContext();

  return (
    <Layout
     renderHeader
     renderFooter
      metadata={{
        title: `${app_metadata.appName} | ${state.auth.name} Workspace`,
        updatedAt: new Date().toISOString(),
      }}>
      <Container>
        {/* <Navbar /> */}
        {/* <NotesList /> */}
        <EditorContainer />
      </Container>
    </Layout>
  );
};

export default Workspace;
