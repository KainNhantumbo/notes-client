import Layout from '@/src/components/Layout';
import { app_metadata } from '@/src/data/app-data';
import { _about as Container } from '@/src/styles/routes/_about';
import { FC } from 'react';

const About: FC = (): JSX.Element => {
  return (
    <Layout metadata={{ title: `${app_metadata.appName} | About` }}>
      <Container></Container>
    </Layout>
  );
};

export default About;