import { FC } from 'react';
import actions from '../data/actions';
import Layout from '@/src/components/Layout';
import { useAppContext } from '../context/AppContext';
import { _notesList as Container } from '@/src/styles/modules/_notes-list';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const NotesList: FC = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
  const { state, dispatch, fetchAPI } = useAppContext();

  return <Container>
    
  </Container>;
};

export default NotesList;
