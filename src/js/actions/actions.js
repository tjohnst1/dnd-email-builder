import { isEmpty } from 'lodash';

export const SWITCH_TAB = 'SWITCH_TAB';
export const SWITCH_CATEGORY = 'SWITCH_CATEGORY';
export const REQUEST_BLOCKS = 'REQUEST_EMAIL_BLOCKS';
export const RECEIVE_BLOCKS = 'RECEIVE_EMAIL_BLOCKS';
export const CHANGE_GLOBAL_WIDTH = 'CHANGE_GLOBAL_WIDTH';
export const CHANGE_BACKGROUND_COLOR = 'CHANGE_BACKGROUND_COLOR';
export const ADD_BLOCK_TO_PREVIEW = 'ADD_BLOCK_TO_PREVIEW';
export const REMOVE_BLOCK_FROM_PREVIEW = 'REMOVE_BLOCK_FROM_PREVIEW';
export const MOVE_BLOCKS_IN_PREVIEW = 'MOVE_BLOCKS_IN_PREVIEW';

import database from '../store/firebase'

export function switchTab(tab) {
  return {
    type: SWITCH_TAB,
    tab,
  };
}

export function switchCategory(category) {
  return {
    type: SWITCH_CATEGORY,
    category,
  };
}

export function fetchEmailBlocksIfNeeded() {
  return (dispatch, getState) => {
    const blocks = getState().blocks;
    if ((isEmpty(blocks.blocksByCategory)) && !blocks.isFetching) {
      return dispatch(fetchEmailBlocks());
    }
  };
}

function requestEmailBlocks() {
  return {
    type: REQUEST_BLOCKS,
    isFetching: true,
  };
}

function fetchEmailBlocks() {
  return dispatch => {
    dispatch(requestEmailBlocks());
    return database.ref('/')
      .once('value', snapshot => {
        const { blocks, categories } = snapshot.val();
        dispatch(receiveEmailBlocks(blocks, categories));
    })
    .catch(error => console.log(error));
  };
}

function receiveEmailBlocks(blocks, categories) {
  return {
    type: RECEIVE_BLOCKS,
    blocks,
    categories,
  };
}

export function changeBackgroundColor(backgroundColor) {
  return {
    type: CHANGE_BACKGROUND_COLOR,
    backgroundColor,
  };
}

export function changeGlobalWidth(width) {
  return {
    type: CHANGE_GLOBAL_WIDTH,
    width,
  };
}

export function addBlockToPreview(id, index) {
  return (dispatch, getState) => {
    const blockToAdd = getState().blocks.all.filter((block) => block.id === id)[0];
    blockToAdd.index = index;
    dispatch(actuallyAddBlockToPreview(blockToAdd, index));
  }
}

function actuallyAddBlockToPreview(block, index){
  return {
    type: ADD_BLOCK_TO_PREVIEW,
    block,
    index,
  };
}

export function removeBlockFromPreview(index) {
  return {
    type: REMOVE_BLOCK_FROM_PREVIEW,
    index,
  };
}

export function moveBlocks(sourceIndex, hoverIndex) {
  console.log("moving")
  return {
    type: MOVE_BLOCKS_IN_PREVIEW,
    sourceIndex,
    hoverIndex,
  }
}
