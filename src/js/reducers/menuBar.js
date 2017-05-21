import { TOGGLE_EXPORT_MODAL } from '../actions/actions';

export function exportModal(state = {isShowing: false}, action) {
  switch (action.type) {
    case TOGGLE_EXPORT_MODAL:
      return {
        isShowing: !state.isShowing,
      };
    default:
      return state;
  }
}
