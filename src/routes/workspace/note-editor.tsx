import { Layout } from '@/components/Layout';
import Editor from '@/components/Editor';
import CustomTools from '@/components/CustomTools';
import { useAppContext } from '@/context/AppContext';
import { _noteEditor as Container } from '@/styles/routes/_note-editor';

export default function NoteEditor() {
  const { state } = useAppContext();
  return (
    <Layout
      metadata={{
        title: `Editor | ${state.currentNote.title}`,
        createdAt: state.currentNote.createdAt || new Date().toISOString(),
        updatedAt: state.currentNote.updatedAt || new Date().toISOString()
      }}>
      <Container>
        <div className='wrapper-container'>
          <CustomTools />
          <Editor />
        </div>
      </Container>
    </Layout>
  );
}
