import {
  TAuth,
  TFolder,
  TModalProps,
  TNote,
  TQuery,
  TSettings,
  TSignIn,
  TSignUp,
  TUser,
} from './index';

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
};

export type TAction = { type: string; payload: TState };
