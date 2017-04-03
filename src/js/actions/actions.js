import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const INVALIDATE_POSTS = 'INVALIDATE_POSTS'

export function invalidatePosts(posts) {
  return {
    type: INVALIDATE_POSTS,
    posts
  }
}

function requestPosts(posts) {
  return {
    type: REQUEST_POSTS,
    posts
  }
}

function receivePosts(type, json) {
  return {
    type: RECEIVE_POSTS,
    posts,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchPosts(type) {
  return dispatch => {
    dispatch(requestPosts(type))
    return fetch(`https://www.website.com/${posts}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(type, json)))
  }
}

function shouldFetchPosts(state, type) {
  const posts = state.postsByType[type]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(type) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), type)) {
      return dispatch(fetchPosts(type))
    }
  }
}
