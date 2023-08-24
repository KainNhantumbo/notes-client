import { FC } from 'react';
import actions from '../data/actions';
import Layout from '@/src/components/Layout';
import { useRouter, NextRouter } from 'next/router';
import { useAppContext } from '../context/AppContext';
import { _editor as Container } from '@/src/styles/modules/_editor';

const Editor: FC = (): JSX.Element => {
  const router: NextRouter = useRouter();
  const { state, dispatch, fetchAPI } = useAppContext();

  return <Container></Container>;
};

export default Editor;