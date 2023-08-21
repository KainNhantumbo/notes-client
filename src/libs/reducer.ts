import { TAction, TState } from '../@types/reducer';

const initialState: TState = {};

const reducer = (action: TAction, state: TState): TState => {
  switch (action.type) {
    default:
      return { ...state };
  }
};

export { initialState, reducer };
