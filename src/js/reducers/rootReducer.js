import { combineReducers } from 'redux';
import database from '../store/firebase';
import { tabs, currentCategory, modules } from './optionsPanel';
import { emailPreview, globalOptions } from './emailPreview';

const rootReducer = combineReducers({
  tabs,
  currentCategory,
  modules,
  emailPreview,
  globalOptions,
});

export default rootReducer;
