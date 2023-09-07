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

  const navigation = {
    top: [
      {
        label: 'All Notes',
        icon: DotsHorizontalIcon,
        anchor: '/workspace?tab=all-notes&folder=none',
        classname: 'all-notes',
        execute: () => {},
      },
      {
        label: 'Folders',
        icon: CardStackIcon,
        anchor: `/workspace?tab=folders&folder=none`,
        classname: 'folders',
        execute: () => {},
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
        execute: () => {},
        children: [],
      },
      {
        label: 'Bookmarks',
        icon: BookmarkIcon,
        anchor: `/workspace?tab=bookmarks&folder=bookmarks`,
        classname: 'bookmarks',
        execute: () => {},
        children: [],
      },
      {
        label: 'Tags',
        icon: TrashIcon,
        anchor: `/workspace?tab=tags&folder=tags`,
        classname: 'tags',
        execute: () => {},
        children: [],
      },
    ],
    bottom: [
      {
        label: 'Settings',
        icon: GearIcon,
        anchor: '/settings',
      },
      {
        label: 'Log out',
        icon: ExitIcon,
        execute: () => {},
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
              onClick={() => {
                navigate(action.anchor);
                action.execute();
              }}>
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
              onClick={() => {
                action.anchor && navigate(action.anchor);
                action.execute && action.execute();
              }}>
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
