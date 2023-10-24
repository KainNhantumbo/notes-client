import actions from '@/shared/actions';
import { MoonLoader } from 'react-spinners';
import { useTheme } from 'styled-components';
import { Layout } from '@/components/Layout';
import Tools from '@/components/editor/Tools';
import { useEffect, Suspense, lazy } from 'react';
import Properties from '@/components/Properties';
import { useAppContext } from '@/context/AppContext';
import { _noteEditor as Container } from '@/styles/routes/_note-editor';
import EditorToolsToggler from '@/components/modals/EditorToolsToggler';

const Editor = lazy(() => import('@/components/editor/Editor'));

export default function NoteEditor() {
  const { state, dispatch } = useAppContext();
  const theme = useTheme();

  useEffect(() => {
    return () => {
      dispatch({
        type: actions.PROPERTIES_DRAWER,
        payload: { ...state, isPropertiesDrawer: false }
      });
    };
  }, []);

  const LoadIndicator = () => (
    <div className='loading-indicator'>
      <div className='loader-content'>
        <MoonLoader
          size={30}
          color={`rgb(${theme.primary_shade})`}
          aria-placeholder='Loading your notes...'
          cssOverride={{
            display: 'block'
          }}
        />
        <h3>Loading your editor...</h3>
      </div>
    </div>
  );

  return (
    <Layout
      metadata={{
        title: `Editor | ${state.currentNote.title}`,
        createdAt: state.currentNote.createdAt || new Date().toISOString(),
        updatedAt: state.currentNote.updatedAt || new Date().toISOString()
      }}>
      <Container>
        <div id='editor-root' className='wrapper-container'>
          <Tools />
          <EditorToolsToggler/>
          <Suspense fallback={<LoadIndicator />}>
            <Editor />
          </Suspense>
          <Properties />
        </div>
      </Container>
    </Layout>
  );
}
