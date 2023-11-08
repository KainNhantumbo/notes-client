import React from 'react';
import { AxiosError } from 'axios';
import type { ChangeEvent, FormEvent } from 'react';
import { IconProps } from '@radix-ui/react-icons/dist/types';

type FetchError = AxiosError<{ message: string; code: number }>;

export type IconType = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;

export type HeadProps =
  | { title?: string; createdAt?: string; updatedAt?: string }
  | undefined;

export type InputEvents =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLSelectElement>
  | ChangeEvent<HTMLTextAreaElement>;

export type SubmitEvent = FormEvent<HTMLFormElement>;

export type ColorScheme = {
  mode: 'auto' | 'manual';
  scheme: 'dark' | 'light';
};

export type Auth = {
  id: string;
  name: string;
  token: string;
  email: string;
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

export type SignIn = { email: string; password: string };

export type SignUp = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type Tag = { id: string; color: string; value: string };

export type Note = {
  _id: string;
  title: string;
  content: string;
  created_by: string;
  folder_id: string;
  pinned: boolean;
  tags: Tag[];
  deleted: boolean;
  priority: 'none' | 'low' | 'medium' | 'high';
  status: 'none' | 'active' | 'pending' | 'reviewing' | 'completed';
  createdAt: string;
  updatedAt: string;
};

export type Folder = {
  _id: string;
  name: string;
  color: string;
  deleted: boolean;
};

export type Modal = {
  title: string;
  status: boolean;
  message: string;
  closeOnDelay?: boolean;
  actionButtonMessage?: string;
  handleFunction?: (data?: Partial<>) => void | Promise<void>;
};

export type Query = {
  search: string;
  sort: string;
  status: string;
  priority: string;
};

export type Option = { value: string; label: string };

export type User = { first_name: string; last_name: string; email: string };

export type Settings = {
  _id: string;
  created_by: string;
  theme: { scheme: 'light' | 'dark'; is_automatic: boolean };
  editor: {
    auto_save: { enabled: boolean; delay: number };
    editing: { enable_toolbar: boolean };
    toolbar: EditorTools;
    font: {
      font_size: number;
      line_height: number;
      font_family: string;
      font_weight: 400 | 500 | 600 | 700 | 800;
    };
  };
};

export type EditorTools = {
  undo: boolean;
  redo: boolean;
  bold: boolean;
  italic: boolean;
  headings: boolean;
  underline: boolean;
  strike: boolean;
  textAlign: boolean;
  highlight: boolean;
  image: boolean;
  superscript: boolean;
  subscript: boolean;
  code: boolean;
  paragraph: boolean;
  bulletList: boolean;
  orderedList: boolean;
  taskList: boolean;
  codeBlock: boolean;
  blockquote: boolean;
  horizontalRuler: boolean;
  hardBreak: boolean;
};

export type Comment = {
  author: {
    name: string;
    carrier: string;
    picture: string;
  };
  comment: string;
};
