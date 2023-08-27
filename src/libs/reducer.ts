import actions from '../data/actions';
import { TAction, TState } from '../@types/reducer';

const initialState: TState = {
  notes: [],
  folders: [],
  isLogoutModal: false,
  signIn: { email: '', password: '' },
  auth: { id: '', email: '', name: '', profile_image: '', token: '' },
  signUp: {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  },
  notification: {
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
    content: '',
    created_by: '',
    metadata: {
      folder_id: '',
      color:   '',
      deleted: false,
      favorite: false,
      labels: 'none',
      priority: 'none',
      reminder: { time: '', expired: false },
      tags: [],
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
    case actions.NOTIFICATION:
      return { ...state, notification: action.payload.notification };
    case actions.PROMPT:
      return { ...state, prompt: action.payload.prompt };
    case actions.CURRENT_NOTE:
      return { ...state, currentNote: action.payload.currentNote };
    default:
      return { ...state };
  }
};

export { initialState, reducer };
