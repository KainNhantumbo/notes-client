import { NextPage } from 'next';
import fetch from '../../config/client'
import actions from '@/src/data/actions';
import Layout from '@/src/components/Layout';
import { app_metadata } from '@/src/data/app-data';
import { NextRouter, useRouter } from 'next/router';
import { _signup as Container } from '@/src/styles/routes/_signup';
import { useAppContext } from '@/src/context/AppContext';

const SignUp: NextPage = (): JSX.Element => {
  const router: NextRouter = useRouter();
  const { state, dispatch } = useAppContext();

  return (
    <Layout metadata={{ title: `${app_metadata.appName} | Sign Up` }}>
      <Container></Container>
    </Layout>
  );
};

export default SignUp;