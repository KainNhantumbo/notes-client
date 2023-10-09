import {
  RiAddLine,
  RiApps2Line,
  RiArrowDropDownLine,
  RiArrowDropUpLine,
  RiDeleteBin6Fill,
  RiDeleteBin6Line,
  RiDeleteBin7Line,
  RiFolder3Line,
  RiHashtag,
  RiHome2Line,
  RiLogoutBoxRLine,
  RiMenuLine,
  RiSettings6Line
} from 'react-icons/ri';
import { IconType } from 'react-icons';
import classnames from 'classnames';
import actions from '../shared/actions';
import { app_metadata } from '@/shared/data';
import logo from '@/assets/logo-192x192.png';
import { useMemo, useState, memo, JSX } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { m as motion, AnimatePresence } from 'framer-motion';
import { _navigationDrawer as Container } from '@/styles/modules/_navigationDrawer';

type Navigation = {
  top: Array<{
    label: string;
    icon: IconType;
    anchor: string;
    classname: string;
    children?: Array<any>;
    execute: () => void;
    statusIndicatorIcons?: { active: IconType; inactive: IconType };
    button?: { icon: IconType; handler: () => void };
  }>;
  bottom: Array<{
    label: string;
    icon: IconType;
    execute: () => void;
  }>;
};

function NavigationDrawer(): JSX.Element {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { state, dispatch, useFetchAPI } = useAppContext();
  const currentTab = searchParams.get('tab')?.split('-')?.join(' ') || '';
  const [openCollapsible, setOpenCollapsible] = useState<boolean>(false);

  const groupedTags = useMemo(() => {
    const tags = state.notes
      .filter((note) => !note.metadata.deleted)
      .map((note) => note.metadata.tags)
      .reduce((acc, current) => {
        const group = acc.concat(current);
        return group;
      }, []);
    return tags;
  }, [state.notes]);

  const deletedNotes = useMemo(() => {
    const data = state.notes.filter((note) => note.metadata.deleted);
    return data;
  }, [state.notes]);

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
          handleFunction: async () => {
            try {
              await useFetchAPI({
                method: 'post',
                url: '/api/v1/auth/default/logout',
                withCredentials: true
              });
              dispatch({
                type: actions.AUTH,
                payload: {
                  ...state,
                  auth: { id: '', name: '', token: '', email: '' }
                }
              });
              dispatch({
                type: actions.NAVIGATION_DRAWER,
                payload: {
                  ...state,
                  isNavigationDrawer: false
                }
              });

              navigate('/auth/signin', { replace: true });
            } catch (error: any) {
              console.error(error?.response?.data?.message || error);
            } finally {
              dispatch({
                type: actions.PROMPT,
                payload: {
                  ...state,
                  prompt: { ...state.prompt, status: false }
                }
              });
            }
          }
        }
      }
    });
  };

  const navigation: Navigation = {
    top: [
      {
        label: 'All Notes',
        icon: RiApps2Line,
        anchor: '/workspace?tab=all-notes&folder=none',
        classname: 'all-notes-class',
        execute: () => {
          navigate('/workspace?tab=all-notes&folder=none');
        }
      },
      {
        label: 'Folders',
        icon: RiFolder3Line,
        classname: 'folders-class',
        anchor: `/workspace?tab=folders&folder=none`,
        statusIndicatorIcons: {
          active: RiArrowDropDownLine,
          inactive: RiArrowDropUpLine
        },
        execute: () => {
          navigate(`/workspace?tab=folders&folder=none`);
        },
        button: { icon: RiAddLine, handler: () => {} },
        children: []
      },
      {
        label: 'Trash',
        icon: RiDeleteBin7Line,
        classname: 'trash-class',
        statusIndicatorIcons: {
          active: RiDeleteBin6Line,
          inactive: RiDeleteBin6Fill
        },
        anchor: `/workspace?tab=trash&folder=trash`,
        execute: () => {
          navigate(`/workspace?tab=trash&folder=trash`);
        },
        children: []
      },
      {
        label: 'Tags',
        icon: RiHashtag,
        classname: 'tags-class',
        statusIndicatorIcons: {
          active: RiArrowDropDownLine,
          inactive: RiArrowDropUpLine
        },
        anchor: `/workspace?tab=tags&folder=tags`,
        execute: () => {
          navigate(`/workspace?tab=tags&folder=tags`);
        },
        children: []
      }
    ],
    bottom: [
      {
        label: 'Logout',
        icon: RiLogoutBoxRLine,
        execute: handleLogout
      },
      {
        label: 'Home',
        icon: RiHome2Line,
        execute: () => {
          dispatch({
            type: actions.NAVIGATION_DRAWER,
            payload: { ...state, isNavigationDrawer: false }
          });
          navigate('/');
        }
      },
      {
        label: 'Settings',
        icon: RiSettings6Line,
        execute: () => {
          dispatch({
            type: actions.NAVIGATION_DRAWER,
            payload: { ...state, isNavigationDrawer: false }
          });
          navigate('/workspace/settings');
        }
      }
    ]
  };

  return (
    <AnimatePresence>
      {state.isNavigationDrawer && (
        <Container>
          <motion.div
            className='main-container'
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, x: -300, transition: { duration: 0.5 } }}>
            <section
              className='header'
              onClick={() => {
                dispatch({
                  type: actions.NAVIGATION_DRAWER,
                  payload: { ...state, isNavigationDrawer: false }
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
              <RiMenuLine className='hamburguer-icon' />
            </section>

            <motion.ul>
              <div className='top-navigator'>
                {navigation.top.map((action, index) => (
                  <li
                    key={String(index)}
                    onClick={() => action.execute()}
                    className={classnames('navigation-item', action.classname, {
                      'navigation-item-active': location.search.includes(
                        action.label.toLowerCase().split(' ').join('-')
                      )
                    })}>
                    <h3 className='navigation-item-title'>
                      <action.icon />
                      <span>{action.label}</span>
                    </h3>

                    <button className='navigation-item-button'></button>

                    {action.children ? (
                      <section className='children-container'>
                        {action.children.map((child, index) => (
                          <p key={String(index)}>dsfijfiosdjfois</p>
                        ))}
                      </section>
                    ) : null}
                  </li>
                ))}
              </div>

              <div className='bottom-navigator'>
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

export default memo(NavigationDrawer);
