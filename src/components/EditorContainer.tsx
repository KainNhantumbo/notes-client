import { FC, Suspense } from 'react';
import actions from '../data/actions';
import Layout from '@/src/components/Layout';
import { useRouter, NextRouter } from 'next/router';
import { useAppContext } from '../context/AppContext';
import { _editor as Container } from '@/src/styles/modules/_editor';
import dynamic from 'next/dynamic';

const Editor = dynamic(import('../libs/editor/Editor'), {ssr: false})

const EditorContainer: FC = (): JSX.Element => {
  const router: NextRouter = useRouter();
  const { state, dispatch, fetchAPI } = useAppContext();

  return (
    <Container>
      <Suspense fallback={'Loading editor'}>
        <Editor />
      </Suspense>
    </Container>
  );
};

export default EditorContainer;
