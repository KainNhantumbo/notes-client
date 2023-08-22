import actions from '../data/actions';
import { TAction, TState } from '../@types/reducer';

const initialState: TState = {
  auth: { id: '', email: '', name: '', profile_image: '', token: '' },
  isLogoutModal: false,
};

const reducer = (state: TState, action: TAction): TState => {
  switch (action.type) {
    case actions.AUTH:
      return { ...state, auth: action.payload.auth };
    case actions.LOGOUT_MODAL:
      return { ...state, isLogoutModal: action.payload.isLogoutModal };
    default:
      return { ...state };
  }
};

export { initialState, reducer };
