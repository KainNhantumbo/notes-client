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
    default:
      return { ...state };
  }
};

export { initialState, reducer };
