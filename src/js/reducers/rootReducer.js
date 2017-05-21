import { combineReducers } from 'redux';
import database from '../store/firebase';
import { tabs, currentCategory, blocks } from './optionsPanel';
import { emailPreview, globalOptions } from './emailPreview';
import { exportModal } from './menuBar';

const rootReducer = combineReducers({
  tabs,
  currentCategory,
  blocks,
  emailPreview,
  globalOptions,
  exportModal,
});

export default rootReducer;
