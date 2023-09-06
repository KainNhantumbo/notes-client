import actions from '../data/actions';
import { TAction, TState } from '../@types/reducer';

const initialState: TState = {
  notes: [],
  folders: [],
  isLogoutModal: false,
  isPropertiesModal: false,
  signIn: { email: '', password: '' },
  windowInnerSize: { width: 0, height: 0 },
  auth: { id: '', email: '', name: '', profile_image: '', token: '' },
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

    default:
      return { ...state };
  }
};

export { initialState, reducer };
