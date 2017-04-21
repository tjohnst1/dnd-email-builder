import { combineReducers } from 'redux';
import database from '../store/firebase';
import { currentTab, currentCategory, emailModules } from './optionsPanel';
import { emailPreview } from './emailPreview';

const rootReducer = combineReducers({
  currentTab,
  currentCategory,
  emailModules,
  emailPreview,
});

export default rootReducer;
