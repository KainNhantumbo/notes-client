import {
  Auth,
  Folder,
  Modal,
  Note,
  Query,
  Settings,
  User
} from '@/types/index';

export type TState = {
  auth: Auth;
  isAboutModal: boolean;
  isLogoutModal: boolean;
  isEditorToolsTogglerModal: boolean;
  isPropertiesDrawer: boolean;
  isNavigationDrawer: boolean;
  notes: Note[];
  currentNote: Note;
  folders: Folder[];
  toast: Modal;
  prompt: Modal;
  windowInnerSize: { width: number; height: number };
  query: Query;
  settings: Settings;
  user: User;
};

export type TAction = { type: string; payload: TState };
