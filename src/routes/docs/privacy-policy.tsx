import { NextPage } from 'next';
import Layout from '@/src/components/Layout';
import { app_metadata } from '@/src/data/app-data';
import { _docs as Container } from '@/src/styles/routes/_docs';

const PrivacyPolicy: NextPage = (): JSX.Element => {
  return (
    <Layout metadata={{ title: `${app_metadata.appName} | Privacy Policy` }}>
      <Container></Container>
    </Layout>
  );
};

export default PrivacyPolicy;