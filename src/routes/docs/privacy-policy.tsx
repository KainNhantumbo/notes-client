import Layout from '@/components/Layout';
import { app_metadata } from '@/data/app-data';
import { _docs as Container } from '@/styles/routes/_docs';
import { FC } from 'react';

const PrivacyPolicy: FC = (): JSX.Element => {
  return (
    <Layout metadata={{ title: `${app_metadata.appName} | Privacy Policy` }}>
      <Container></Container>
    </Layout>
  );
};

export default PrivacyPolicy;
