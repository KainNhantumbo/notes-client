import { NextPage } from 'next';
import fetch from '../../config/client';
import Layout from '@/src/components/Layout';
import { NextRouter, useRouter } from 'next/router';
import { _signin as Container } from '@/src/styles/routes/_signin';
import { useAppContext } from '@/src/context/AppContext';

const SignIn: NextPage = (): JSX.Element => {
  const router: NextRouter = useRouter();
  const { state, dispatch } = useAppContext();
  
  return (
    <Layout metadata={{}}>
      <Container></Container>
    </Layout>
  );
};

export default SignIn;
