import { FC } from 'react';
import actions from '../data/actions';
import Layout from '@/components/Layout';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { _navbar as Container } from '@/styles/modules/_navbar';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const Navbar: FC = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
  const { state, dispatch, fetchAPI } = useAppContext();

  return (
    <Container>
      <Sidebar collapsed={false}>
        <Menu>
          <SubMenu label='Charts'>
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <MenuItem> Documentation </MenuItem>
          <MenuItem> Calendar </MenuItem>
        </Menu>
      </Sidebar>
    </Container>
  );
};

export default Navbar;
