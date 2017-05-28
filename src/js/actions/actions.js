import { isEmpty, uniqueId, cloneDeep } from 'lodash';

export const SWITCH_TAB = 'SWITCH_TAB';
export const SWITCH_CATEGORY = 'SWITCH_CATEGORY';
export const REQUEST_BLOCKS = 'REQUEST_EMAIL_BLOCKS';
export const RECEIVE_BLOCKS = 'RECEIVE_EMAIL_BLOCKS';
export const CHANGE_GLOBAL_WIDTH = 'CHANGE_GLOBAL_WIDTH';
export const CHANGE_BACKGROUND_COLOR = 'CHANGE_BACKGROUND_COLOR';
export const ADD_BLOCK_TO_PREVIEW = 'ADD_BLOCK_TO_PREVIEW';
export const REMOVE_BLOCK_FROM_PREVIEW = 'REMOVE_BLOCK_FROM_PREVIEW';
export const REMOVE_ALL_BLOCKS_IN_PREVIEW = 'REMOVE_ALL_BLOCKS_IN_PREVIEW';
export const MOVE_BLOCK_IN_PREVIEW = 'MOVE_BLOCKS_IN_PREVIEW';
export const CLEAR_MARKER_FROM_PREVIEW = 'CLEAR_MARKER_FROM_PREVIEW';
export const MOVE_MARKER = 'MOVE_MARKER';
export const TOGGLE_EXPORT_MODAL = 'TOGGLE_EXPORT_MODAL';
export const SELECT_COMPONENT = 'SELECT_COMPONENT';
export const UPDATE_COMPONENT_VALUE = 'UPDATE_COMPONENT_VALUE';

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

export function updateComponentValue(componentInfo, property, value) {
  return {
    type: UPDATE_COMPONENT_VALUE,
    componentInfo,
    property,
    value,
  }
}

export function addBlockToPreview(blockId) {
  return (dispatch, getState) => {
    const newBlockId = uniqueId();
    const clonedState = cloneDeep(getState())
    let blockToAdd = clonedState.blocks.all.filter((block) => block.id === blockId)[0];
    blockToAdd.blockId = newBlockId;
    blockToAdd.content = blockToAdd.content.map((component, i) => {
      const newComponent = component;
      newComponent.componentId = `${newBlockId}-${i + 1}`;
      return newComponent;
    })

    dispatch(actuallyAddBlockToPreview(blockToAdd));
  };
}

function actuallyAddBlockToPreview(block){
  return {
    type: ADD_BLOCK_TO_PREVIEW,
    block,
  };
}

export function removeAllBlocksInPreview() {
  return {
    type: REMOVE_ALL_BLOCKS_IN_PREVIEW,
  };
}

export function removeBlockFromPreview(index) {
  return {
    type: REMOVE_BLOCK_FROM_PREVIEW,
    index,
  };
}

export function moveBlock(sourceBlockId) {
  return {
    type: MOVE_BLOCK_IN_PREVIEW,
    sourceBlockId,
  };
}

export function clearMarkerFromPreview() {
  return {
    type: CLEAR_MARKER_FROM_PREVIEW,
  };
}

export function moveMarker(index) {
  return {
    type: MOVE_MARKER,
    index,
  };
}

export function toggleExportModal() {
  return {
    type: TOGGLE_EXPORT_MODAL,
  };
}

export function selectComponent(info) {
  return {
    type: SELECT_COMPONENT,
    info,
  };
}
