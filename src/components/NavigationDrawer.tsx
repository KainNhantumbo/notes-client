import {
  ArchiveIcon,
  BookmarkIcon,
  CornersIcon,
  DotsHorizontalIcon,
  DrawingPinIcon,
  ExitIcon,
  GearIcon,
  HamburgerMenuIcon,
  PlusIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { useState } from 'react';
import actions from '../shared/actions';
import { useAppContext } from '../context/AppContext';
import { _navigationDrawer as Container } from '@/styles/modules/_navigationDrawer';
import { m as motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/logo-192x192.png';
import { app_metadata } from '@/shared/data';
import * as Collapsible from '@radix-ui/react-collapsible';

export function NavigationDrawer() {
  const navigate: NavigateFunction = useNavigate();
  const { state, dispatch, fetchAPI } = useAppContext();
  const [openCollapsible, setOpenCollapsible] = useState<boolean>(false);

  const handleLogout = (): void => {
    dispatch({
      type: actions.PROMPT,
      payload: {
        ...state,
        prompt: {
          status: true,
          actionButtonMessage: 'Confirm',
          title: 'Logout',
          message: 'Do you really want to exit this session and logout?',
          handleFunction: async (): Promise<void> => {
            try {
              await fetchAPI({
                method: 'post',
                url: '/api/v1/auth/default/logout',
                withCredentials: true,
              });
              dispatch({
                type: actions.AUTH,
                payload: {
                  ...state,
                  auth: { id: '', name: '', token: '', email: '' },
                },
              });
              dispatch({
                type: actions.NAVIGATION,
                payload: {
                  ...state,
                  navigation: {
                    ...state.navigation,
                    is_navigation_drawer: false,
                  },
                },
              });

              navigate('/auth/signin', { replace: true });
            } catch (error: any) {
              console.error(error?.response?.data?.message || error);
            } finally {
              dispatch({
                type: actions.PROMPT,
                payload: {
                  ...state,
                  prompt: { ...state.prompt, status: false },
                },
              });
            }
          },
        },
      },
    });
  };

  const navigation = {
    top: [
      {
        label: 'All Notes',
        icon: DotsHorizontalIcon,
        anchor: '/workspace?tab=all-notes&folder=none',
        classname: 'all-notes',
        execute: () => {
          navigate('/workspace?tab=all-notes&folder=none');
        },
      },
      {
        label: 'Folders',
        icon: ArchiveIcon,
        anchor: `/workspace?tab=folders&folder=none`,
        classname: 'folders',
        execute: () => {
          navigate(`/workspace?tab=folders&folder=none`);
        },
        button: {
          icon: PlusIcon,
          handleFunction: () => {},
        },
        children: [],
      },
      {
        label: 'Trash',
        icon: TrashIcon,
        anchor: `/workspace?tab=trash&folder=trash`,
        classname: 'trash',
        execute: () => {
          navigate(`/workspace?tab=trash&folder=trash`);
        },
        children: [],
      },
      {
        label: 'Bookmarks',
        icon: BookmarkIcon,
        anchor: `/workspace?tab=bookmarks&folder=bookmarks`,
        classname: 'bookmarks',
        execute: () => {
          navigate(`/workspace?tab=bookmarks&folder=bookmarks`);
        },
        children: [],
      },
      {
        label: 'Tags',
        icon: DrawingPinIcon,
        anchor: `/workspace?tab=tags&folder=tags`,
        classname: 'tags',
        execute: () => {
          navigate(`/workspace?tab=tags&folder=tags`);
        },
        children: [],
      },
    ],
    bottom: [
      {
        label: 'Logout',
        icon: ExitIcon,
        execute: handleLogout,
      },
      {
        label: 'Go Home',
        icon: CornersIcon,
        execute: () => {
          dispatch({
            type: actions.NAVIGATION,
            payload: {
              ...state,
              navigation: { ...state.navigation, is_navigation_drawer: false },
            },
          });
          navigate('/');
        },
      },
      {
        label: 'Open Settings',
        icon: GearIcon,
        execute: () => {
          dispatch({
            type: actions.NAVIGATION,
            payload: {
              ...state,
              navigation: { ...state.navigation, is_navigation_drawer: false },
            },
          });
          navigate('/workspace/settings');
        },
      },
    ],
  };

  return (
    <AnimatePresence>
      {state.navigation.is_navigation_drawer && (
        <Container>
          <motion.div
            className='main-container'
            initial={{ x: 0 }}
            animate={{
              translateX: 0,
            }}
            exit={{ translateX: -300, transition: { duration: 0.25 } }}
            transition={{ duration: 0.5 }}>
            <section
              className='header-container'
              onClick={() => {
                dispatch({
                  type: actions.NAVIGATION,
                  payload: {
                    ...state,
                    navigation: {
                      ...state.navigation,
                      is_navigation_drawer: false,
                    },
                  },
                });
              }}>
              <div className='logo-container'>
                <img
                  src={logo}
                  loading='lazy'
                  decoding='async'
                  alt={`${app_metadata.appName} logo image`}
                  aria-placeholder={`${app_metadata.appName} logo image`}
                />
                <h3>{app_metadata.appName.toLowerCase()}</h3>
              </div>
              <HamburgerMenuIcon />
            </section>

            <motion.ul>
              <Collapsible.Root
                open={openCollapsible}
                onOpenChange={setOpenCollapsible}
                className='top-container'>
                {navigation.top.map((action, index) => (
                  <li
                    key={String(index)}
                    onClick={() => action.execute()}
                    className={`element ${action.classname} ${
                      location.search.includes(
                        action.label.toLowerCase().split(' ').join('-')
                      )
                        ? 'active-element'
                        : ''
                    }`}>
                    <Collapsible.Trigger asChild className='item-container'>
                      <h3>
                        <action.icon />
                        <span>{action.label}</span>
                      </h3>
                    </Collapsible.Trigger>

                    {action.children ? (
                      <Collapsible.Content className='children-container'>
                        {action.children.map((child, index) => (
                          <p key={String(index)}>dsfijfiosdjfois</p>
                        ))}
                      </Collapsible.Content>
                    ) : null}
                  </li>
                ))}
              </Collapsible.Root>

              <div className='bottom-container'>
                {navigation.bottom.map((action, index) => (
                  <button
                    key={String(index)}
                    className={`element`}
                    onClick={() => action.execute()}>
                    <action.icon />
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </motion.ul>
          </motion.div>
        </Container>
      )}
    </AnimatePresence>
  );
}
