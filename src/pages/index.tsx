'use client'
import { NextPage } from 'next';
import { useAppContext } from '../context/AppContext';
import { _home as Container } from '../styles/routes/_home';

const Home: NextPage = (): JSX.Element => {

  const { state } = useAppContext();
  console.log(state.auth);

  return <Container>
    <h2 className='title'>
      He we are back on work
    </h2>
  </Container>;
};

export default Home;
