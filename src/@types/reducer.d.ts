import { TAuth, TFolder, TModalProps, TNote, TSignIn, TSignUp } from './index';

export type TState = {
  auth: TAuth;
  isLogoutModal: boolean;
  notes: TNote[];
  folders: TFolder[];
  signIn: TSignIn;
  signUp: TSignUp;
  notification: TModalProps;
  prompt: TModalProps;
};

export type TAction = { type: string; payload: TState };
