import Layout from '@/src/components/Layout';
import { NextPage } from 'next';
import { _about as Container } from '@/src/styles/routes/_about';

const About: NextPage = (): JSX.Element => {
  return (
    <Layout metadata={{}}>
      <Container></Container>
    </Layout>
  );
};

export default About;