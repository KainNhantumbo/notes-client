import actions from '@/shared/actions';
import { Layout } from '@/components/Layout';
import React, { useEffect, JSX } from 'react';
import Editor from '@/components/editor/Editor';
import Properties from '@/components/Properties';
import CustomTools from '@/components/editor/Tools';
import { useAppContext } from '@/context/AppContext';
import { _noteEditor as Container } from '@/styles/routes/_note-editor';

function NoteEditor(): JSX.Element {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    return () => {
      dispatch({
        type: actions.PROPERTIES_DRAWER,
        payload: { ...state, isPropertiesDrawer: false }
      });
    };
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

export default React.memo(NoteEditor);
