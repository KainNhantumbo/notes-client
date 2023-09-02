import Layout from '@/components/Layout';
import { app_metadata } from '@/data/app-data';
import { _about as Container } from '@/styles/routes/_about';
import { FC } from 'react';

const About: FC = (): JSX.Element => {
  return (
    <Layout metadata={{ title: `${app_metadata.appName} | About` }}>
      <Container></Container>
    </Layout>
  );
};

export default About;
