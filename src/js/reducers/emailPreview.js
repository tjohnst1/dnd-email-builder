import { CHANGE_GLOBAL_WIDTH, CHANGE_BACKGROUND_COLOR, ADD_BLOCK_TO_PREVIEW, REMOVE_BLOCK_FROM_PREVIEW } from '../actions/actions';

const emailPreviewState = {
  blocks: [],
}

export function emailPreview(state = emailPreviewState, action) {
  const blocks = state.blocks;
  switch (action.type) {
    case ADD_BLOCK_TO_PREVIEW:
      return {
        blocks: blocks
          .slice(0, action.index)
          .concat(action.block)
          .concat(blocks.slice(action.index)),
      };
    case REMOVE_BLOCK_FROM_PREVIEW:
      return { blocks: blocks
        .slice(0, action.index)
        .concat(blocks.slice(action.index + 1)),
      };
    default:
      return state;
  }
}

const globalOptionsIntialState = {
  width: 640,
  backgroundColor: "#ffffff",
}

export function globalOptions(state = globalOptionsIntialState, action) {
  switch (action.type) {
    case CHANGE_GLOBAL_WIDTH:
      return Object.assign({}, state, {
        width: action.width,
      });
    case CHANGE_BACKGROUND_COLOR:
      return Object.assign({}, state, {
        backgroundColor: action.backgroundColor,
      });
    default:
      return state;
  }
};
