import Layout from '@/components/Layout';
import Tools from '@/components/editor/Tools';
import { useAppContext } from '@/context/AppContext';
import actions from '@/shared/actions';
import { _noteEditor as Container } from '@/styles/routes/_note-editor';
import { Suspense, lazy, useEffect } from 'react';
import { MoonLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

const Properties = lazy(() => import('@/components/Properties'));
const Editor = lazy(() => import('@/components/editor/Editor'));
const EditorToolsToggler = lazy(() => import('@/components/modals/EditorToolsToggler'));

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
          <Suspense>
            <EditorToolsToggler />
          </Suspense>
          <Suspense fallback={<LoadIndicator />}>
            <Editor />
          </Suspense>
          <Suspense>
            <Properties />
          </Suspense>
        </div>
      </Container>
    </Layout>
  );
}
