import { NextPage } from 'next';
import Layout from '@/src/components/Layout';
import { app_metadata } from '@/src/data/app-data';
import { _about as Container } from '@/src/styles/routes/_about';

const About: NextPage = (): JSX.Element => {
  return (
    <Layout metadata={{ title: `${app_metadata.appName} | About` }}>
      <Container></Container>
    </Layout>
  );
};

export default About;