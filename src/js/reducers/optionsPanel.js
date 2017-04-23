import { SWITCH_TAB, SWITCH_CATEGORY, REQUEST_BLOCKS, RECEIVE_BLOCKS } from '../actions/actions';

const tabsIntialState = {
  selected: 'Blocks',
  names: ['Blocks', 'Styles'],
};

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
  }
};

const blocksInitialState = {
  isFetching: false,
  all: [],
  categories: [],
};

export function blocks(state = blocksInitialState, action) {
  switch (action.type) {
    case REQUEST_BLOCKS:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_BLOCKS:
      return Object.assign({}, state, {
        isFetching: false,
        all: action.blocks,
        categories: action.categories,
      });
    default:
      return state;
  }
};
