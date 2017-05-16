import { TOGGLE_MODAL } from '../actions/actions';

export function modal(state = {isShowing: false}, action) {
  switch (action.type) {
    case TOGGLE_MODAL:
      return {
        isShowing: !state.isShowing,
      };
    default:
      return state;
  }
}
