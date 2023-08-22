import { NextPage } from 'next';
import { useAppContext } from '../context/AppContext';
import { _home as Container } from '../styles/routes/_home';
import { NextRouter, useRouter } from 'next/router';
import Layout from '../components/Layout';
import { app_metadata } from '../data/app-data';
import Header from '../components/Header';

const Home: NextPage = (): JSX.Element => {
  const { state } = useAppContext();
  const router: NextRouter = useRouter();

  return (
    <Layout metadata={{ title: `${app_metadata.appName} | Home` }}>
      <Container>
      <Header />
        <h2 className='title'>He we are back on work</h2>
      </Container>
    </Layout>
  );
};

export default Home;
