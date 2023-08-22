import Layout from '@/src/components/Layout';
import { NextPage } from 'next';
import { _docs as Container } from '@/src/styles/routes/_docs';

const PrivacyPolicy: NextPage = (): JSX.Element => {
  return (
    <Layout metadata={{}}>
      <Container></Container>
    </Layout>
  );
};

export default PrivacyPolicy;