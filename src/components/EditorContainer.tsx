import { FC } from 'react';
import actions from '../data/actions';
import Layout from '@/src/components/Layout';
import { useRouter, NextRouter } from 'next/router';
import { useAppContext } from '../context/AppContext';
import { _editor as Container } from '@/src/styles/modules/_editor';
import Editor from '../libs/editor/Editor';

const EditorContainer: FC = (): JSX.Element => {
  const router: NextRouter = useRouter();
  const { state, dispatch, fetchAPI } = useAppContext();

  return (
    <Container>
      <Editor />
    </Container>
  );
};

export default EditorContainer;
