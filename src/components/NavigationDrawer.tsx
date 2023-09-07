import {
  BookmarkIcon,
  CardStackIcon,
  DotsHorizontalIcon,
  ExitIcon,
  GearIcon,
  PlusIcon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { FC } from 'react';
import actions from '../data/actions';
import { useAppContext } from '../context/AppContext';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { _navigationDrawer as Container } from '@/styles/modules/_navigationDrawer';

export const NavigationDrawer: FC = (): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();
  const { state, dispatch, fetchAPI } = useAppContext();

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
                url: '/api/v1/auth/logout',
                withCredentials: true,
              });
              dispatch({
                type: actions.AUTH,
                payload: {
                  ...state,
                  auth: {
                    id: '',
                    name: '',
                    token: '',
                    email: '',
                    profile_image: '',
                  },
                },
              });
              navigate('/auth/sign-in', { replace: true });
            } catch (error: any) {
              console.error(error?.response?.data?.message ?? error);
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
        icon: CardStackIcon,
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
        icon: TrashIcon,
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
        label: 'Settings',
        icon: GearIcon,
        execute: () => {
          navigate('/workspace/settings');
        },
      },
      {
        label: 'Log out',
        icon: ExitIcon,
        execute: handleLogout,
      },
    ],
  };

  return (
    <Container>
      <div className='wrapper-container'>
        <section className='top-container'>
          {navigation.top.map((action, index) => (
            <div
              key={String(index)}
              className={`element ${action.classname}`}
              onClick={() => action.execute()}>
              <div className='header-container'>
                <h3>
                  <action.icon />
                  <span>{action.label}</span>
                </h3>
                <button></button>
              </div>

              {action.children ? (
                <div className='children-container'>
                  {action.children.map((child, index) => (
                    <p key={String(index)}></p>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </section>

        <section className='bottom-container'>
          {navigation.bottom.map((action, index) => (
            <button
              key={String(index)}
              className={`element`}
              onClick={() => action.execute()}>
              <h3>
                <action.icon />
                <span>{action.label}</span>
              </h3>
            </button>
          ))}
        </section>
      </div>
    </Container>
  );
};
