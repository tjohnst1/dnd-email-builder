import { combineReducers } from 'redux';
import { SWITCH_TAB } from '../actions/actions';

function currentTab(state = 'Blocks', action) {
  switch (action.type) {
    case SWITCH_TAB:
      return action.tab;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  currentTab,
});

export default rootReducer;
