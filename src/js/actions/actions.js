import { isEmpty } from 'lodash';

export const SWITCH_TAB = 'SWITCH_TAB';
export const SWITCH_CATEGORY = 'SWITCH_CATEGORY';
export const REQUEST_MODULES = 'REQUEST_EMAIL_MODULES';
export const RECEIVE_MODULES = 'RECEIVE_EMAIL_MODULES';
export const CHANGE_GLOBAL_WIDTH = 'CHANGE_GLOBAL_WIDTH';
export const CHANGE_BACKGROUND_COLOR = 'CHANGE_BACKGROUND_COLOR';

import database from '../store/firebase'

export function switchTab(tab) {
  return {
    type: SWITCH_TAB,
    tab,
  }
};

export function switchCategory(category) {
  return {
    type: SWITCH_CATEGORY,
    category,
  }
};

export function fetchEmailModulesIfNeeded() {
  return (dispatch, getState) => {
    const modules = getState().modules;
    if ((isEmpty(modules.modulesByCategory)) && !modules.isFetching) {
      return dispatch(fetchEmailModules());
    }
  }
};

function requestEmailModules() {
  return {
    type: REQUEST_MODULES,
    isFetching: true,
  }
};

function fetchEmailModules() {
  return dispatch => {
    dispatch(requestEmailModules());
    return database.ref('/')
      .once('value', snapshot => {
        const { modules, categories } = snapshot.val();
        dispatch(receiveEmailModules(modules, categories));
    })
    .catch(error => console.log(error));
  }
};

function receiveEmailModules(modules, categories) {
  return {
    type: RECEIVE_MODULES,
    modules,
    categories,
  }
};

export function changeBackgroundColor(backgroundColor) {
  return {
    type: CHANGE_BACKGROUND_COLOR,
    backgroundColor,
  }
}

export function changeGlobalWidth(width) {
  return {
    type: CHANGE_GLOBAL_WIDTH,
    width,
  }
}
