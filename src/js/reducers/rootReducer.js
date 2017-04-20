import { combineReducers } from 'redux';
import database from '../store/firebase';
import { SWITCH_TAB, SWITCH_CATEGORY, REQUEST_EMAIL_MODULES, RECEIVE_EMAIL_MODULES, ADD_MODULE, REMOVE_MODULE } from '../actions/actions';

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

const testState = [
  {
    "name": "Preheader",
    "image": "img/modules/one-column/preheader.png",
    "type": "one-column",
    "content":
      [{
        "type": "text",
        "color": "#828282",
        "fontFamily": "Helvetica, Arial, sans-serif",
        "fontSize": "10px",
        "lineHeight": "12px",
        "textAlign": "center",
        "innerContent": "This is a test"
      }],
  },
  {
  "name": "Full Width Image",
  "image": "img/modules/one-column/full-width-image.png",
  "type": "one-column",
  "content": [
    {
      "type": "image",
      "link": true,
      "src": "http://placehold.it/576x200",
      "width": "576"
    }]
  },
]

function emailPreview(state = testState, action) {
  switch (action.type) {
    case ADD_MODULE:
      return [...state, action.emailModule];
    case REMOVE_MODULE:
      return state.filter(emailModule => emailModule.name !== action.emailModule.name);
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  currentTab,
  currentCategory,
  emailModules,
  emailPreview,
});

export default rootReducer;
