import type { IconType } from 'react-icons';
import type { StaticImageData } from 'next/image';
import type { OutputData } from '@editorjs/editorjs';
import type { ReactNode, ChangeEvent, FormEvent } from 'react';

export type InputEvents =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLSelectElement>
  | ChangeEvent<HTMLTextAreaElement>;

export type SubmitEvent = FormEvent<HTMLFormElement>;

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
  name: string;
  description: string;
  content: {
    time?: number;
    version?: string;
    blocks: Array<{
      id?: string | undefined;
      type: string;
      data: any;
      tunes?: { [name: string]: any };
    }>;
  };
  metadata: {
    folder: string;
    color: string;
    favorite: boolean;
    reminder: { time: string; expired: boolean };
    tags: string[];
  };
};

export type TFolder = {
  _id: string;
  name: string;
  metadata: {
    color: string;
    favorite: boolean;
    tags: string[];
  };
};
