import { NextPage } from 'next';
import actions from '../../data/actions';
import Layout from '@/src/components/Layout';
import { useAppContext } from '../../context/AppContext';
import { _notes as Container } from '@/src/styles/routes/_notes';

const Notes: NextPage = (): JSX.Element => {
  const { state, dispatch, fetchAPI } = useAppContext();

  return (
    <Layout metadata={{}}>
      <Container></Container>
    </Layout>
  );
};

export default Notes;
