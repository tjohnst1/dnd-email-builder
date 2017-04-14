import { combineReducers } from 'redux';
import { SWITCH_TAB, SWITCH_CATEGORY } from '../actions/actions';

function currentTab(state = 'Blocks', action) {
  switch (action.type) {
    case SWITCH_TAB:
      return action.tab;
    default:
      return state;
  }
};

function currentCategory(state = null, action) {
  switch (action.type) {
    case SWITCH_CATEGORY:
      return action.category;
    default:
      return state;
  };
}

function blocks(state = [], action) {
  return state;
}

const rootReducer = combineReducers({
  currentTab,
  currentCategory,
  blocks,
});

export default rootReducer;
