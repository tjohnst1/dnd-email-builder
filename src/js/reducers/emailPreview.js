import { CHANGE_GLOBAL_WIDTH, CHANGE_BACKGROUND_COLOR, ADD_BLOCK_TO_PREVIEW,
  REMOVE_BLOCK_FROM_PREVIEW, MOVE_BLOCK_IN_PREVIEW, CLEAR_MARKER_FROM_PREVIEW,
  MOVE_MARKER } from '../actions/actions';

const emailPreviewState = {
  blocks: [],
}

export function emailPreview(state = emailPreviewState, action) {
  let temp;
  const blocks = state.blocks;
  switch (action.type) {
    case MOVE_MARKER:
      temp = blocks.slice().filter(
        block => block.id !== 'preview-panel-marker'
      )
      temp.splice(action.index, 0, {
        id: 'preview-panel-marker',
        category: 'preview-panel-marker',
        name: 'Preview Panel Marker',
      });
      return Object.assign({}, state, {
        blocks: temp
      });

    case ADD_BLOCK_TO_PREVIEW:
      return Object.assign({}, state, {
        blocks: blocks
          .slice()
          .concat(action.block)
        },
      );

    case REMOVE_BLOCK_FROM_PREVIEW:
      temp = blocks
        .slice(0, action.index)
        .concat(blocks.slice(action.index + 1))
      return Object.assign({}, state, {
          blocks: temp,
        }
      );

    case MOVE_BLOCK_IN_PREVIEW:
      const { sourcePreviewId } = action;
      let blockToMove;

      // find the block by preview id and remove it
      temp = blocks.slice().filter((block) => {
        if (block.previewId === sourcePreviewId) {
          blockToMove = block;
          return false;
        }
        return true;
      });

      // replace the marker with the block in question
      temp = temp.map((block) => {
        if (block.id === 'preview-panel-marker') {
          return blockToMove;
        }
        return block;
      });

      return Object.assign({}, state, {
          blocks: temp,
        }
      );

    case CLEAR_MARKER_FROM_PREVIEW:
      return Object.assign({}, state, {
        blocks: blocks.slice().filter(block =>
          block.id !== 'preview-panel-marker'),
      });
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
