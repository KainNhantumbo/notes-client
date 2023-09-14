import type { ChangeEvent, FormEvent } from 'react';
import { editorThemeOptions } from '@/shared/data';

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

export type Tag = { id: string; color: string; value: string };

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
    tags: Tag[];
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
  actionButtonMessage: string | undefined;
  handleFunction: (() => void | Promise<void>) | undefined;
};

export type TQuery = {
  search: string;
  sort: string;
};

export type TOption = { value: string; label: string };

export type TSettings = {
  _id: string;
  created_by: string;
  editor: {
    auto_save: {
      enabled: boolean;
      delay: number;
    };
    font: {
      font_size: number;
      line_height: number;
      font_family: string;
      font_weight: 400 | 500 | 600 | 700 | 800;
    };
    editing: {
      line_numbers: boolean;
      enable_toolbar: boolean;
      enable_relative_line_numbers: boolean;
      tab_size: number;
      highlight_active_line: boolean;
    };
  };
  theme: {
    ui_theme: 'light' | 'dark';
    editor_theme: string;
    automatic_ui_theme: boolean;
  };
};

export type TUser = {
  first_name: string;
  last_name: string;
  email: string;
};

export type TNavigation = {
  is_navigation_drawer: boolean;
  is_notes_list: boolean;
  is_editor_container: boolean;
};
