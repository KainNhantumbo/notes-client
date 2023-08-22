import { TAuth, TFolder, TNote, TSignIn, TSignUp } from '.';

export type TState = {
  auth: TAuth;
  isLogoutModal: boolean;
  notes: TNote[]
  folders: TFolder[]
  signIn: TSignIn,
  signUp: TSignUp,
};

export type TAction = { type: string; payload: TState };
