import { Layout } from '@/components/Layout';
import Editor from '@/components/editor/Editor';
import CustomTools from '@/components/editor/CustomTools';
import { useAppContext } from '@/context/AppContext';
import { _noteEditor as Container } from '@/styles/routes/_note-editor';
import Properties from '@/components/Properties';
import { useEffect } from 'react';
import actions from '@/shared/actions';

export default function NoteEditor() {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    dispatch({
      type: actions.PROPERTIES_DRAWER,
      payload: { ...state, isPropertiesDrawer: false }
    });
  }, []);
  
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
          <Properties />
        </div>
      </Container>
    </Layout>
  );
}
