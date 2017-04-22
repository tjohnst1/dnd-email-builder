import { SWITCH_TAB, SWITCH_CATEGORY, REQUEST_MODULES, RECEIVE_MODULES } from '../actions/actions';

const tabsIntialState = {
  selected: 'Modules',
  names: ['Modules', 'Styles'],
}

export function tabs(state = tabsIntialState, action) {
  switch (action.type) {
    case SWITCH_TAB:
      return Object.assign({}, state, {
        selected: action.tab,
      })
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
  all: [],
  categories: [],
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
        all: action.modules,
        categories: action.categories,
      });
    default:
      return state;
  }
}
