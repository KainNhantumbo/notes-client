import { create } from 'zustand';
import { TState } from '@/types/reducer';

export const useStore = create<TState>(() => ({
  notes: [],
  folders: [],
  isLogoutModal: false,
  navigation: {
    is_navigation_drawer: false,
    is_editor_container: true,
    is_notes_list: true,
  },
  isPropertiesModal: false,
  signIn: { email: '', password: '' },
  windowInnerSize: { width: 0, height: 0 },
  auth: { id: '', email: '', name: '', profile_image: '', token: '' },
  user: {
    first_name: '',
    last_name: '',
    email: '',
    profile_image: { id: '', url: '' },
  },
  signUp: {
    first_name: '',
    last_name: '',  
    email: '',
    password: '',
    confirm_password: '',
  },
  toast: {
    title: '',
    message: '',
    status: false,
    handleFunction: () => {},
    actionButtonMessage: '',
  },
  prompt: {
    title: '',
    message: '',
    status: false,
    handleFunction: () => {},
    actionButtonMessage: '',
  },
  currentNote: {
    _id: '',
    title: '',
    content: ``,
    created_by: '',
    metadata: {
      folder_id: '',
      color: '',
      deleted: false,
      bookmarked: false,
      status: 'none',
      priority: 'none',
      reminder: { time: '', expired: false },
      tags: [],
    },
    updatedAt: '',
    createdAt: '',
  },
  query: {
    search: '',
    sort: '',
  },
  settings: {
    _id: '',
    created_by: '',
    editor: {
      auto_save: { enabled: true, delay: 500 },
      font: {
        font_size: 16,
        line_height: 1.6,
        font_family:
          "Menlo, 'JetBrains Mono', Consolas, 'Liberation Mono', 'Courier New', ui-monospace, monospace",
        font_weight: 400,
      },
      editing: {
        line_numbers: false,
        enable_toolbar: true,
        enable_relative_line_numbers: false,
        tab_size: 2,
        highlight_active_line: false,
      },
    },
    theme: {
      ui_theme: 'light',
      editor_theme: 'xcode',
      automatic_ui_theme: true,
    },
  },
}));


useStore((state)=>({}))