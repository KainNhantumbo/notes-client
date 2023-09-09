import {
  TAuth,
  TFolder,
  TModalProps,
  TNavigation,
  TNote,
  TQuery,
  TSettings,
  TSignIn,
  TSignUp,
  TUser,
} from '@/types/index';

export type TState = {
  auth: TAuth;
  isLogoutModal: boolean;
  isPropertiesModal: boolean;
  notes: TNote[];
  currentNote: TNote;
  folders: TFolder[];
  signIn: TSignIn;
  signUp: TSignUp;
  toast: TModalProps;
  prompt: TModalProps;
  windowInnerSize: { width: number; height: number };
  query: TQuery;
  settings: TSettings;
  user: TUser;
  navigation: TNavigation;
};

export type TAction = { type: string; payload: TState };
