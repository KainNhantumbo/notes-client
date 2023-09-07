import { FC } from 'react';
import actions from '../data/actions';
import { useAppContext } from '../context/AppContext';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { _navigationDrawer as Container } from '@/styles/modules/_navigationDrawer';

export const NavigationDrawer: FC = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
  const { state, dispatch, fetchAPI } = useAppContext();
  
  const navigation = [];

  return <Container></Container>;
};
