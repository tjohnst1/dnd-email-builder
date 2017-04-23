import { combineReducers } from 'redux';
import database from '../store/firebase';
import { tabs, currentCategory, blocks } from './optionsPanel';
import { emailPreview, globalOptions } from './emailPreview';

const rootReducer = combineReducers({
  tabs,
  currentCategory,
  blocks,
  emailPreview,
  globalOptions,
});

export default rootReducer;
