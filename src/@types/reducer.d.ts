import { TAuth, TFolder, TNote, TNotification, TSignIn, TSignUp } from '.';

export type TState = {
  auth: TAuth;
  isLogoutModal: boolean;
  notes: TNote[];
  folders: TFolder[];
  signIn: TSignIn;
  signUp: TSignUp;
  notification: TNotification;
};

export type TAction = { type: string; payload: TState };
