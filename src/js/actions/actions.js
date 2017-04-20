export const SWITCH_TAB = 'SWITCH_TAB';
export const SWITCH_CATEGORY = 'SWITCH_CATEGORY';
export const REQUEST_EMAIL_MODULES = 'REQUEST_EMAIL_MODULES';
export const RECEIVE_EMAIL_MODULES = 'RECEIVE_EMAIL_MODULES';
export const ADD_MODULE = 'ADD_MODULE';
export const REMOVE_MODULE = 'REMOVE_MODULE';

import database from '../store/firebase'

export function switchTab(tab) {
  return {
    type: SWITCH_TAB,
    tab,
  }
}

export function switchCategory(category) {
  return {
    type: SWITCH_CATEGORY,
    category,
  }
}

export function fetchEmailModulesIfNeeded() {
  return (dispatch, getState) => {
    const emailModules = getState().emailModules;
    if ((emailModules.categories.length < 1) && !emailModules.isFetching) {
      return dispatch(fetchEmailModules());
    }
  }
}

function requestEmailModules() {
  return {
    type: REQUEST_EMAIL_MODULES,
    isFetching: true,
  }
}

function fetchEmailModules() {
  return dispatch => {
    dispatch(requestEmailModules());
    return database.ref('/')
      .once('value', snapshot => {
        const emailModules = snapshot.val().categories;
        dispatch(receiveEmailModules(emailModules));
    })
    .catch(error => console.log(error));
  };
}

function receiveEmailModules(emailModules) {
  return {
    type: RECEIVE_EMAIL_MODULES,
    emailModules,
  }
}

export function addModule(emailModule) {
  return {
    type: ADD_MODULE,
    emailModule,
  }
}

export function removeModule(emailModule) {
  return {
    type: REMOVE_MODULE,
    emailModule,
  }
}
