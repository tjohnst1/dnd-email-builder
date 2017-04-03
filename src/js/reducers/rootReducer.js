import { combineReducers } from 'redux'
import { INVALIDATE_POSTS, REQUEST_POSTS, RECEIVE_POSTS } from '../actions/actions'

function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_POSTS:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsByType(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_POSTS:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.type]: posts(state[action.type], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsByType
})

export default rootReducer
