import actions from '../shared/actions';
import { TAction, TState } from '@/types/reducer';

const initialState: TState = {
  notes: [],
  folders: [],
  isAboutModal: false,
  isLogoutModal: false,
  isNavigationDrawer: false,
  isPropertiesDrawer: false,
  signIn: { email: '', password: '' },
  windowInnerSize: { width: 0, height: 0 },
  auth: { id: '', email: '', name: '', token: '' },
  user: { first_name: '', last_name: '', email: '' },
  signUp: {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: ''
  },
  toast: {
    title: '',
    message: '',
    status: false,
    handleFunction: () => {},
    actionButtonMessage: ''
  },
  prompt: {
    title: '',
    message: '',
    status: false,
    handleFunction: () => {},
    actionButtonMessage: ''
  },
  currentNote: {
    _id: '',
    title: '',
    content: '',
    created_by: '',
    folder_id: '',
    deleted: false,
    pinned: false,
    status: 'none',
    priority: 'none',
    tags: [],
    updatedAt: '',
    createdAt: ''
  },
  query: { search: '', sort: '-updatedAt', status: '', priority: '' },
  settings: {
    _id: '',
    created_by: '',
    editor: {
      auto_save: { enabled: true, delay: 500 },
      font: {
        font_size: 16,
        line_height: 1.6,
        font_family:
          "Inter, Menlo, 'JetBrains Mono', Consolas, 'Liberation Mono', 'Courier New', ui-monospace, monospace",
        font_weight: 400
      },
      editing: { enable_toolbar: true }
    },
    theme: { scheme: 'light', is_automatic: true }
  }
};

function reducer(state: TState, action: TAction): TState {
  switch (action.type) {
    case actions.AUTH:
      return { ...state, auth: action.payload.auth };

    case actions.LOGOUT_MODAL:
      return { ...state, isLogoutModal: action.payload.isLogoutModal };

    case actions.ABOUT_MODAL:
      return { ...state, isAboutModal: action.payload.isAboutModal };

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

    case actions.PROPERTIES_DRAWER:
      return {
        ...state,
        isPropertiesDrawer: action.payload.isPropertiesDrawer
      };

    case actions.QUERY_NOTES:
      return { ...state, query: action.payload.query };

    case actions.SETTINGS:
      return { ...state, settings: action.payload.settings };

    case actions.USER:
      return { ...state, user: action.payload.user };

    case actions.NAVIGATION_DRAWER:
      return {
        ...state,
        isNavigationDrawer: action.payload.isNavigationDrawer
      };

    default:
      return { ...state };
  }
}

export { initialState, reducer };
