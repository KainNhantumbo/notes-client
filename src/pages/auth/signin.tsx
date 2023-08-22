import { NextPage } from 'next';
import fetch from '../../config/client';
import actions from '@/src/data/actions';
import Layout from '@/src/components/Layout';
import { NextRouter, useRouter } from 'next/router';
import { _signin as Container } from '@/src/styles/routes/_signin';
import { useAppContext } from '@/src/context/AppContext';
import { app_metadata } from '@/src/data/app-data';

const SignIn: NextPage = (): JSX.Element => {
  const router: NextRouter = useRouter();
  const { state, dispatch } = useAppContext();
  
  return (
    <Layout metadata={{ title: `${app_metadata.appName} | Sign In` }}>
      <Container></Container>
    </Layout>
  );
};

export default SignIn;
