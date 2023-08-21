import actions from '../data/actions';
import { TAction, TState } from '../@types/reducer';

const initialState: TState = {
  auth: { id: '', email: '', name: '', profile_image: '', token: '' },
};

const reducer = (state: TState, action: TAction): TState => {
  switch (action.type) {
    case actions.AUTH:
      return { ...state, auth: action.payload.auth };
    default:
      return { ...state };
  }
};

export { initialState, reducer };
