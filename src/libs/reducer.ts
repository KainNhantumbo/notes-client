import actions from '../data/actions';
import { TAction, TState } from '@/@types/reducer';

const initialState: TState = {
  notes: [],
  folders: [],
  isLogoutModal: false,
  navigation_drawer: { status: false },
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
          "Menlo, Consolas, 'JetBrains Mono', 'Liberation Mono', 'Courier New', ui-monospace, monospace",
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
};

const reducer = (state: TState, action: TAction): TState => {
  switch (action.type) {
    case actions.AUTH:
      return { ...state, auth: action.payload.auth };

    case actions.LOGOUT_MODAL:
      return { ...state, isLogoutModal: action.payload.isLogoutModal };

    case actions.SIGN_IN:
      return { ...state, signIn: action.payload.signIn };

    case actions.SIGN_UP:
      return { ...state, signUp: action.payload.signUp };

    case actions.NOTES:
      return { ...state, notes: action.payload.notes };

    case actions.FOLDERS:
      return { ...state, folders: action.payload.folders };

    case actions.TOAST:
      return { ...state, toast: action.payload.toast };

    case actions.PROMPT:
      return { ...state, prompt: action.payload.prompt };

    case actions.CURRENT_NOTE:
      return { ...state, currentNote: action.payload.currentNote };

    case actions.WINDOW_INNER_SIZE:
      return { ...state, windowInnerSize: action.payload.windowInnerSize };

    case actions.PROPERTIES_MODAL:
      return { ...state, isPropertiesModal: action.payload.isLogoutModal };

    case actions.QUERY_NOTES:
      return { ...state, query: action.payload.query };

    case actions.SETTINGS:
      return { ...state, settings: action.payload.settings };

    case actions.USER:
      return { ...state, user: action.payload.user };

    case actions.NAVIGATION_DRAWER:
      return { ...state, navigation_drawer: action.payload.navigation_drawer };

    default:
      return { ...state };
  }
};

export { initialState, reducer };
