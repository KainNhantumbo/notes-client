import {
  RiAddLine,
  RiApps2Line,
  RiArrowDropDownLine,
  RiArrowDropUpLine,
  RiCloseLine,
  RiDeleteBin6Fill,
  RiDeleteBin6Line,
  RiDeleteBin7Line,
  RiFolder3Line,
  RiHashtag,
  RiHome2Line,
  RiInformationLine,
  RiLogoutBoxRLine,
  RiMenuLine,
  RiSettings6Line
} from 'react-icons/ri';
import { IconType } from 'react-icons';
import classnames from 'classnames';
import { Collapse } from 'react-collapse';
import actions from '../shared/actions';
import { app_metadata } from '@/shared/data';
import logo from '@/assets/logo-192x192.png';
import { useMemo, useState, memo, JSX } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { m as motion, AnimatePresence } from 'framer-motion';
import { _navigationDrawer as Container } from '@/styles/modules/_navigationDrawer';
import {
  CaretDownIcon,
  CaretUpIcon,
  DotFilledIcon
} from '@radix-ui/react-icons';

type Navigation = Array<{
  label: string;
  icon: IconType;
  execute: () => void;
}>;

function NavigationDrawer(): JSX.Element {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { state, dispatch, useFetchAPI } = useAppContext();
  const [isCollapsed, setIsCollapsed] = useState({
    folders: false,
    tags: false
  });

  const currentTab = searchParams.get('tab')?.split('-')?.join(' ') || '';

  const assertLocation = (label: string) =>
    currentTab.toLowerCase() === label.toLowerCase();

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

  const navigation: Navigation = [
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
      label: 'About',
      icon: RiInformationLine,
      execute: () =>
        dispatch({
          type: actions.ABOUT_MODAL,
          payload: { ...state, isAboutModal: true }
        })
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
  ];

  const notes = useMemo(() => {
    return {
      label: 'all notes',
      icon: RiApps2Line,
      class: 'all-notes-class',
      length: state.notes.filter((note) => !note.deleted).length,
      execute: () => {
        navigate('/workspace?tab=all-notes&folder=none');
      }
    };
  }, [state.notes]);

  const trash = useMemo(() => {
    return {
      label: 'trash',
      icon: RiDeleteBin7Line,
      class: 'trash-class',
      length: state.notes.filter((note) => note.deleted).length,
      execute: () => {
        navigate(`/workspace?tab=trash&folder=trash`);
      }
    };
  }, [state.notes]);

  const tags = useMemo(() => {
    const tags = state.notes
      .filter((note) => !note.deleted)
      .map((note) => note.tags)
      .reduce((acc, current, i, arr) => {
        const group = acc.concat(current);
        return group;
      }, [])
      .map((item, index, array) => {
        const duplicates = array.filter(
          (duplicate) => duplicate.value == item.value
        );
        if (duplicates.length > 0) return { ...item, count: duplicates.length };
        return { ...item, count: 0 };
      });

    //TODO: remove duplicated tags

    // const t = tags
    //   .map((item, index, array) =>
    //     array.some((tag) => tag.count === item.count) ? null : item
    //   )
    //   .filter((tag) => tag !== null);

    return {
      label: 'tags',
      icon: RiHashtag,
      class: 'tags-class',
      statusIndicatorIcons: {
        active: CaretDownIcon,
        inactive: CaretUpIcon
      },
      length: tags.length,
      execute: () => {
        navigate(`/workspace?tab=tags&folder=tags`);
      },
      children: [...tags]
    };
  }, [state.notes]);

  const folders = useMemo(() => {
    return {
      label: 'folders',
      icon: RiFolder3Line,
      classname: 'folders-class',
      anchor: `/workspace?tab=folders&folder=none`,
      statusIndicatorIcons: {
        active: RiArrowDropDownLine,
        inactive: RiArrowDropUpLine
      },
      length: state.folders.length,
      execute: () => {
        navigate(`/workspace?tab=folders&folder=none`);
      },
      button: { icon: RiAddLine, handler: () => {} },
      children: []
    };
  }, [state.notes]);

  return (
    <AnimatePresence>
      {state.isNavigationDrawer && (
        <Container>
          <motion.div
            className='main-container'
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, x: -300, transition: { duration: 0.5 } }}>
            <section className='header'>
              <motion.button
                whileTap={{ scale: 0.8 }}
                className='box-btn_close'
                onClick={() => {
                  dispatch({
                    type: actions.NAVIGATION_DRAWER,
                    payload: { ...state, isNavigationDrawer: false }
                  });
                }}>
                <RiCloseLine />
              </motion.button>
              <h3>
                <i>Choco</i>notey
              </h3>
            </section>

            <motion.ul>
              <div className='top-navigator'>
                <li
                  className={classnames('navigation-item', notes.class)}
                  onClick={() => notes.execute()}>
                  <div
                    className={classnames('navigation-box-container', {
                      'navigation-box-container-active': assertLocation(
                        notes.label
                      )
                    })}>
                    <h3 className='navigation-item-title'>
                      <notes.icon />
                      <span>{notes.label}</span>
                    </h3>
                    <div className='navigation-item-length'>{notes.length}</div>
                  </div>
                </li>

                <li
                  className={classnames('navigation-item', tags.class)}
                  onClick={() => tags.execute()}>
                  <div
                    className={classnames('navigation-box-container', {
                      'navigation-box-container-active': assertLocation(
                        tags.label
                      )
                    })}>
                    <h3 className='navigation-item-title'>
                      <tags.icon />
                      <span>{tags.label}</span>
                    </h3>
                    <section className='navigation-item-actions'>
                      <button
                        className='navigation-item_state-indicator-button'
                        onClick={() => {
                          setIsCollapsed((state) => ({
                            ...state,
                            tags: !state.tags
                          }));
                        }}>
                        {isCollapsed.tags ? (
                          <tags.statusIndicatorIcons.active />
                        ) : (
                          <tags.statusIndicatorIcons.inactive />
                        )}
                      </button>
                      <div className='navigation-item-length'>
                        {tags.length}
                      </div>
                    </section>
                  </div>

                  <div className='childrens-container'>
                    <Collapse
                      isOpened={isCollapsed.tags}
                      theme={{
                        collapse: 'collapsable-container',
                        content: 'tags-collapsable'
                      }}>
                      {tags.children.map((child) => (
                        <div key={child.id} className='tags-container'>
                          <h4>
                            <DotFilledIcon
                              style={{ color: child.color }}
                              className='tag-icon'
                            />
                            <span>{child.value}</span>
                          </h4>
                          <div className='tag-count'>{child.count}</div>
                        </div>
                      ))}
                    </Collapse>
                  </div>
                </li>

                <li
                  className={classnames('navigation-item', trash.class)}
                  onClick={() => trash.execute()}>
                  <div
                    className={classnames('navigation-box-container', {
                      'navigation-box-container-active': assertLocation(
                        trash.label
                      )
                    })}>
                    <h3 className='navigation-item-title'>
                      <trash.icon />
                      <span>{trash.label}</span>
                    </h3>
                    <div className='navigation-item-length'>{trash.length}</div>
                  </div>
                </li>
              </div>

              <div className='bottom-navigator'>
                {navigation.map((action, index) => (
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
