import { combineReducers } from 'redux'
import { SWITCH_TAB } from '../actions/actions'

function currentTab(state = 'blocks', action) {
  switch (action.type) {
    case SWITCH_TAB:
      return action.tab
    default:
      return state
  }
}

const rootReducer = combineReducers({
  optionsPanel: {
    currentTab: currentTab
  }
})

export default rootReducer
