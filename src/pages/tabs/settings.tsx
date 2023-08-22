import { NextPage } from 'next';
import actions from '../../data/actions';
import Layout from '@/src/components/Layout';
import { NextRouter, useRouter } from 'next/router';
import { useAppContext } from '../../context/AppContext';
import { _settings as Container } from '@/src/styles/routes/_settings';

const Settings: NextPage = (): JSX.Element => {
  const router: NextRouter = useRouter();
  const { state, dispatch, fetchAPI } = useAppContext();

  return (
    <Layout metadata={{}}>
      <Container></Container>
    </Layout>
  );
};

export default Settings;