import { TAuth } from ".";

export type TState = {
  auth: TAuth
};

export type TAction = { type: string; payload: TState };
