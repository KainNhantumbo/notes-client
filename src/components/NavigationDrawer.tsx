import { prioritiesMap, statusMap } from '@/shared/data';
import { _navigationDrawer as Container } from '@/styles/modules/_navigationDrawer';
import type { FetchError, Navigation } from '@/types';
import { CaretDownIcon, CaretUpIcon, DotFilledIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { AnimatePresence, m as motion } from 'framer-motion';
import { memo, useMemo, useState } from 'react';
import { Collapse } from 'react-collapse';
import * as Ri from 'react-icons/ri';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import actions from '../shared/actions';

function NavigationDrawer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { state, dispatch, useFetchAPI } = useAppContext();
  const [isCollapsed, setIsCollapsed] = useState({
    folders: false,
    tags: false,
    status: false,
    priorities: false
  });

  const currentTab = useMemo(
    () => searchParams.get('tab')?.split('-')?.join(' ') || '',
    [searchParams]
  );

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
                payload: { ...state, auth: { id: '', name: '', token: '', email: '' } }
              });
              dispatch({
                type: actions.NAVIGATION_DRAWER,
                payload: { ...state, isNavigationDrawer: false }
              });

              navigate('/auth/signin', { replace: true });
            } catch (error) {
              console.error((error as FetchError).response?.data.message || error);
            } finally {
              dispatch({
                type: actions.PROMPT,
                payload: { ...state, prompt: { ...state.prompt, status: false } }
              });
            }
          }
        }
      }
    });
  };

  const navigation: Navigation = [
    { label: 'Logout', icon: Ri.RiLogoutBoxRLine, execute: handleLogout },
    {
      label: 'Home',
      icon: Ri.RiHome2Line,
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
      icon: Ri.RiInformationLine,
      execute: () => {
        dispatch({
          type: actions.ABOUT_MODAL,
          payload: { ...state, isAboutModal: true }
        });
      }
    },
    {
      label: 'Settings',
      icon: Ri.RiSettings6Line,
      execute: () => {
        dispatch({
          type: actions.NAVIGATION_DRAWER,
          payload: { ...state, isNavigationDrawer: false }
        });
        navigate('/workspace/settings');
      }
    }
  ];

  const priorities = useMemo(() => {
    return {
      label: 'priorities',
      icon: Ri.RiTimerFlashLine,
      class: 'priorities-class',
      statusIndicatorIcons: { active: CaretDownIcon, inactive: CaretUpIcon },
      execute: () => navigate(`/workspace?tab=priorities&folder=none`),
      children: {
        none: state.notes.filter((note) => note.priority === 'none').length,
        high: state.notes.filter((note) => note.priority === 'high').length,
        medium: state.notes.filter((note) => note.priority === 'medium').length,
        low: state.notes.filter((note) => note.priority === 'low').length
      }
    };
  }, [state.notes]);

  const statuses = useMemo(() => {
    return {
      label: 'status',
      icon: Ri.RiBubbleChartLine,
      class: 'status-class',
      statusIndicatorIcons: { active: CaretDownIcon, inactive: CaretUpIcon },
      execute: () => navigate(`/workspace?tab=status&folder=none`),
      children: {
        none: state.notes.filter((note) => note.status === 'none').length,
        active: state.notes.filter((note) => note.status === 'active').length,
        completed: state.notes.filter((note) => note.status === 'completed').length,
        reviewing: state.notes.filter((note) => note.status === 'reviewing').length,
        pending: state.notes.filter((note) => note.status === 'pending').length
      }
    };
  }, [state.notes]);

  const notes = useMemo(() => {
    return {
      label: 'all notes',
      icon: Ri.RiApps2Line,
      class: 'all-notes-class',
      length: state.notes.filter((note) => !note.deleted).length,
      execute: () => navigate('/workspace?tab=all-notes&folder=none')
    };
  }, [state.notes]);

  const trash = useMemo(() => {
    return {
      label: 'trash',
      icon: Ri.RiDeleteBin7Line,
      class: 'trash-class',
      length: state.notes.filter((note) => note.deleted).length,
      execute: () => navigate(`/workspace?tab=trash&folder=trash`)
    };
  }, [state.notes]);

  const tags = useMemo(() => {
    const tags = state.notes
      .filter((note) => !note.deleted)
      .map(({ tags }) => tags)
      .reduce((acc, current) => acc.concat(current), [])
      .map((item, i, tags) => {
        const duplicates = tags.filter((duplicate) => duplicate.value === item.value);
        return { ...item, count: duplicates.length };
      })
      .filter((obj, i, arr) => i === arr.findIndex((o) => obj.value === o.value))
      .sort((a, b) => (a.value.toLowerCase() > b.value.toLowerCase() ? 1 : -1));

    return {
      label: 'tags',
      icon: Ri.RiHashtag,
      class: 'tags-class',
      statusIndicatorIcons: { active: CaretDownIcon, inactive: CaretUpIcon },
      length: tags.length,
      execute: () => navigate(`/workspace?tab=tags&folder=`),
      children: [...tags]
    };
  }, [state.notes, searchParams]);

  // TODO:ADD FOLDERS FEATURE
  // const folders = useMemo(() => {
  //   return {
  //     label: 'folders',
  //     icon: Ri.RiFolder3Line,
  //     class: 'folders-class',
  //     anchor: `/workspace?tab=folders&folder=none`,
  //     statusIndicatorIcons: {
  //       active: RiArrowDropDownLine,
  //       inactive: RiArrowDropUpLine
  //     },
  //     length: state.folders.length,
  //     execute: () => {
  //       navigate(`/workspace?tab=folders&folder=none`);
  //     },
  //     button: { icon: RiAddLine, handler: () => {} },
  //     children: []
  //   };
  // }, [state.notes]);

  if (!state.isNavigationDrawer) return <></>;

  return (
    <AnimatePresence>
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
              <Ri.RiCloseLine />
            </motion.button>
            <h3>
              <i>Choco</i>notey
            </h3>
          </section>

          <motion.ul>
            <div className='top-navigator'>
              <li
                className={clsx('navigation-item', notes.class)}
                onClick={() => notes.execute()}>
                <div
                  className={clsx('navigation-box-container', {
                    'navigation-box-container-active': assertLocation(notes.label)
                  })}>
                  <h3 className='navigation-item-title'>
                    <notes.icon />
                    <span>{notes.label}</span>
                  </h3>
                  <div className='navigation-item-length'>{notes.length}</div>
                </div>
              </li>

              <li
                className={clsx('navigation-item', priorities.class)}
                onClick={() => priorities.execute()}>
                <div
                  className={clsx('navigation-box-container', {
                    'navigation-box-container-active': assertLocation(priorities.label)
                  })}>
                  <h3 className='navigation-item-title'>
                    <priorities.icon />
                    <span>{priorities.label}</span>
                  </h3>
                  <section className='navigation-item-actions'>
                    <button
                      className='navigation-item_state-indicator-button'
                      onClick={() => {
                        setIsCollapsed((state) => ({
                          ...state,
                          priorities: !state.priorities
                        }));
                      }}>
                      {isCollapsed.priorities ? (
                        <priorities.statusIndicatorIcons.active />
                      ) : (
                        <priorities.statusIndicatorIcons.inactive />
                      )}
                    </button>
                  </section>
                </div>

                <div className='childrens-container'>
                  <Collapse
                    isOpened={isCollapsed.priorities}
                    theme={{
                      collapse: 'collapsable-container',
                      content: 'inner-collapsable'
                    }}>
                    {Object.entries(priorities.children).map(([key, count]) => {
                      const [{ data }] = prioritiesMap.filter((item) => item.value === key);
                      return (
                        <div key={key} className='priorities-container'>
                          <h4>
                            <DotFilledIcon color={data.color} />
                            <span>{data.label}</span>
                          </h4>
                          <div>{count}</div>
                        </div>
                      );
                    })}
                  </Collapse>
                </div>
              </li>

              <li
                className={clsx('navigation-item', statuses.class)}
                onClick={() => statuses.execute()}>
                <div
                  className={clsx('navigation-box-container', {
                    'navigation-box-container-active': assertLocation(statuses.label)
                  })}>
                  <h3 className='navigation-item-title'>
                    <statuses.icon />
                    <span>{statuses.label}</span>
                  </h3>
                  <section className='navigation-item-actions'>
                    <button
                      className='navigation-item_state-indicator-button'
                      onClick={() => {
                        setIsCollapsed((state) => ({
                          ...state,
                          status: !state.status
                        }));
                      }}>
                      {isCollapsed.status ? (
                        <statuses.statusIndicatorIcons.active />
                      ) : (
                        <statuses.statusIndicatorIcons.inactive />
                      )}
                    </button>
                  </section>
                </div>

                <div className='childrens-container'>
                  <Collapse
                    isOpened={isCollapsed.status}
                    theme={{
                      collapse: 'collapsable-container',
                      content: 'inner-collapsable'
                    }}>
                    {Object.entries(statuses.children).map(([key, count]) => {
                      const [{ data }] = statusMap.filter((item) => item.value === key);
                      return (
                        <div key={key} className='status-container'>
                          <h4>
                            <data.icon color={data.color} />
                            <span>{data.label}</span>
                          </h4>
                          <div>{count}</div>
                        </div>
                      );
                    })}
                  </Collapse>
                </div>
              </li>

              <li
                className={clsx('navigation-item', tags.class)}
                onClick={() => tags.execute()}>
                <div
                  className={clsx('navigation-box-container', {
                    'navigation-box-container-active': assertLocation(tags.label)
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
                    <div className='navigation-item-length'>{tags.length}</div>
                  </section>
                </div>

                <div className='childrens-container'>
                  <Collapse
                    isOpened={isCollapsed.tags}
                    theme={{
                      collapse: 'collapsable-container',
                      content: 'inner-collapsable'
                    }}>
                    {tags.children.map((child) => (
                      <div
                        key={child.id}
                        className='tags-container'
                        onClick={() => {
                          navigate(`/workspace?tab=tags&folder=${child.value}`);
                        }}>
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
                className={clsx('navigation-item', trash.class)}
                onClick={() => trash.execute()}>
                <div
                  className={clsx('navigation-box-container', {
                    'navigation-box-container-active': assertLocation(trash.label)
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
    </AnimatePresence>
  );
}

export default memo(NavigationDrawer);
