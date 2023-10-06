import {
  Auth,
  Folder,
  Modal,
  TNavigation,
  Note,
  Query,
  Settings,
  SignIn,
  SignUp,
  User
} from '@/types/index';

export type TState = {
  auth: Auth;
  isLogoutModal: boolean;
  isPropertiesDrawer: boolean;
  isNavigationDrawer: boolean;
  notes: Note[];
  currentNote: Note;
  folders: Folder[];
  signIn: SignIn;
  signUp: SignUp;
  toast: Modal;
  prompt: Modal;
  windowInnerSize: { width: number; height: number };
  query: Query;
  settings: Settings;
  user: User;
};

export type TAction = { type: string; payload: TState };
