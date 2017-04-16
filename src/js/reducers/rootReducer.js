import { combineReducers } from 'redux';
import database from '../store/firebase';
import { SWITCH_TAB, SWITCH_CATEGORY, REQUEST_EMAIL_MODULES, RECEIVE_EMAIL_MODULES } from '../actions/actions';

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

function emailModules(state = { isFetching: false, categories: [] }, action) {
  switch (action.type) {
    case REQUEST_EMAIL_MODULES:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_EMAIL_MODULES:
      return Object.assign({}, state, {
        isFetching: false,
        categories: action.emailModules,
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  currentTab,
  currentCategory,
  emailModules,
});

export default rootReducer;
