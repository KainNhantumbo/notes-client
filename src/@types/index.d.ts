import type { ChangeEvent, FormEvent } from 'react';

export type THeadProps =
  | {
      title?: string;
      createdAt?: string;
      updatedAt?: string;
    }
  | undefined;

export type InputEvents =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLSelectElement>
  | ChangeEvent<HTMLTextAreaElement>;

export type SubmitEvent = FormEvent<HTMLFormElement>;

export type TColorScheme = {
  mode: 'auto' | 'manual';
  scheme: 'dark' | 'light';
};

export type TAuth = {
  id: string;
  name: string;
  token: string;
  email: string;
  profile_image: string;
};

export type Theme = {
  primary: string;
  primary_shade: string;
  secondary: string;
  secondary_shade: string;
  font: string;
  font_dimmed: string;
  white: string;
  black: string;
  error: string;
  background: string;
  background_shade: string;
  foreground: string;
  foreground_shade: string;
};

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export type TSignIn = {
  email: string;
  password: string;
};

export type TSignUp = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type TNote = {
  _id: string;
  title: string;
  content: string;
  created_by: string;
  metadata: {
    folder_id: string;
    color: string;
    bookmarked: boolean;
    reminder: { time: string; expired: boolean };
    tags: { color: string; value: string }[];
    deleted: boolean;
    priority: 'none' | 'low' | 'medium' | 'high';
    status: 'none' | 'pending' | 'processing' | 'reviewing' | 'completed';
  };
  createdAt: string;
  updatedAt: string;
};

export type TFolder = {
  _id: string;
  name: string;
  metadata: {
    color: string;
    favorite: boolean;
    tags: string[];
    deleted: boolean;
  };
};

export type TModalProps = {
  title: string;
  status: boolean;
  message: string;
  actionButtonMessage: string;
  handleFunction: () => void | Promise<void>;
};

export type TQuery = {
  search: string;
  sort: string;
};

export type TOption = { value: string; label: string };
