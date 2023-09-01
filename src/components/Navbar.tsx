import { FC } from 'react';
import actions from '../data/actions';
import Layout from '@/src/components/Layout';
import { useRouter, NextRouter } from 'next/router';
import { useAppContext } from '../context/AppContext';
import { _navbar as Container } from '@/src/styles/modules/_navbar';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const Navbar: FC = (): JSX.Element => {
  const router: NextRouter = useRouter();
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
