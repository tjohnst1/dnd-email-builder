import { CHANGE_GLOBAL_WIDTH, CHANGE_BACKGROUND_COLOR, ADD_BLOCK_TO_PREVIEW,
  REMOVE_BLOCK_FROM_PREVIEW, MOVE_BLOCKS_IN_PREVIEW, CLEAR_MARKER_FROM_PREVIEW,
  MOVE_MARKER } from '../actions/actions';

const emailPreviewState = {
  blocks: [],
  markerIndex: null,
}

export function emailPreview(state = emailPreviewState, action) {
  let temp;
  const blocks = state.blocks;
  switch (action.type) {
    case MOVE_MARKER:
      temp = blocks.slice().filter(block => block.id !== 'preview-panel-marker');
      return Object.assign({}, state, {
        markerIndex: action.index,
        blocks: temp
          .slice(0, action.index)
          .concat({
            id: 'preview-panel-marker',
            category: 'preview-panel-marker',
            name: 'Preview Panel Marker',
          })
          .concat(temp.slice(action.index))
          .map((block, i) => {
            block.index = i;
            return block;
          }),
      });
    case ADD_BLOCK_TO_PREVIEW:
      return Object.assign({}, state, {
        blocks: blocks
          .slice(0, action.index)
          .concat(action.block)
          .concat(blocks.slice(action.index))
        }
      );
    case REMOVE_BLOCK_FROM_PREVIEW:
      temp = blocks
        .slice(0, action.index)
        .concat(blocks.slice(action.index + 1))
        .map((block, i) => {
          block.index = i;
          return block;
        });
      return Object.assign({}, state, {
          blocks: temp,
        }
      );
    case MOVE_BLOCKS_IN_PREVIEW:
      const { hoverIndex, sourceIndex } = action;
      temp = blocks.slice();
      const blockToMove = temp.splice(sourceIndex, 1)[0];
      temp.splice(hoverIndex, 0, blockToMove);
      temp.map((block, i) => {
        block.index = i;
        return block;
      })
      return Object.assign({}, state, {
          blocks: temp,
        }
      );
    case CLEAR_MARKER_FROM_PREVIEW:
      return Object.assign({}, state, {
        blocks: blocks.slice().filter(block =>
          block.id !== 'preview-panel-marker'),
        }
      );
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
