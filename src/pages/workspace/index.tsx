import { NextPage } from 'next';
import Layout from '@/src/components/Layout';
import Navbar from '@/src/components/Navbar';
import Editor from '@/src/components/Editor';
import { app_metadata } from '@/src/data/app-data';
import NotesList from '@/src/components/NotesList';
import { useAppContext } from '../../context/AppContext';
import { _workspace as Container } from '@/src/styles/routes/_workspace';

const Workspace: NextPage = (): JSX.Element => {
  const { state } = useAppContext();

  return (
    <Layout
      metadata={{
        title: `${app_metadata.appName} | ${state.auth.name} Workspace`,
        updatedAt: new Date().toISOString(),
      }}>
      <Container>
        <Navbar />
        <NotesList />
        <Editor />
      </Container>
    </Layout>
  );
};

export default Workspace;
