import { NextPage } from 'next';
import Layout from '../components/Layout';
import { app_metadata } from '../data/app-data';
import { NextRouter, useRouter } from 'next/router';
import { useAppContext } from '../context/AppContext';
import { _home as Container } from '../styles/routes/_home';

const Home: NextPage = (): JSX.Element => {
  const { state } = useAppContext();
  const router: NextRouter = useRouter();

  return (
    <Layout
      renderHeader={true}
      metadata={{ title: `${app_metadata.appName} | Overview` }}>
      <Container>
        <h2 className='title'>He we are back on work</h2>
      </Container>
    </Layout>
  );
};

export default Home;
