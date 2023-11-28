import {
  Auth,
  Folder,
  Modal,
  Note,
  Query,
  Settings,
  User
} from '@/types/index';

export type State = {
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
  query: Query;
  settings: Settings;
  user: User;
};

export type Action = { type: string; payload: State };
