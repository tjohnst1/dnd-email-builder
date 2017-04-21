import { SWITCH_TAB, SWITCH_CATEGORY, REQUEST_MODULES, RECEIVE_MODULES } from '../actions/actions';

export function currentTab(state = 'Modules', action) {
  switch (action.type) {
    case SWITCH_TAB:
      return action.tab;
    default:
      return state;
  }
};

export function currentCategory(state = null, action) {
  switch (action.type) {
    case SWITCH_CATEGORY:
      return action.category;
    default:
      return state;
  };
}

const modulesInitialState = {
  isFetching: false,
  modulesById: [],
  moduleCategories: [],
}

export function modules(state = modulesInitialState, action) {
  switch (action.type) {
    case REQUEST_MODULES:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_MODULES:
      return Object.assign({}, state, {
        isFetching: false,
        modulesById: action.modulesById,
        moduleCategories: action.moduleCategories,
      });
    default:
      return state;
  }
}
