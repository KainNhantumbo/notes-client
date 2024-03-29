import type { IconProps } from '@radix-ui/react-icons/dist/types';
import type { AxiosError } from 'axios';
import type { ChangeEvent, FormEvent } from 'react';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export type FetchError = AxiosError<{ message: string; code: number }>;

export type InputEvents = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>;

export type SubmitEvent = FormEvent<HTMLFormElement>;

export type IconType = React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;

export type HeadProps = { title?: string; createdAt?: string; updatedAt?: string };

export type ColorScheme = {
  mode: 'auto' | 'manual';
  scheme: 'dark' | 'light';
};

export type Auth = { id: string; name: string; token: string; email: string };

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

export type Folder = { _id: string; name: string; color: string; deleted: boolean };

export type Modal = {
  title: string;
  status: boolean;
  message: string;
  closeOnDelay?: boolean;
  actionButtonMessage?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleFunction?: (param?: any) => void | Promise<void>;
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
  theme: { scheme: 'dark' | 'light'; is_automatic: boolean };
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

export type Navigation = Array<{
  label: string;
  icon: IconType;
  execute: () => void;
}>;

export type Comment = {
  author: { name: string; carrier: string; picture: string };
  comment: string;
};

export type Contact = { alias: string; path: string; icon: IconType };
