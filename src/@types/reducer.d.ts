import {
  TAuth,
  TFolder,
  TModalProps,
  TNote,
  TQuery,
  TSettings,
  TSignIn,
  TSignUp,
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
  settings: TSettings
};

export type TAction = { type: string; payload: TState };
