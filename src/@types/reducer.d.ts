import { TAuth } from '.';

export type TState = {
  auth: TAuth;
  isLogoutModal: boolean;
};

export type TAction = { type: string; payload: TState };
