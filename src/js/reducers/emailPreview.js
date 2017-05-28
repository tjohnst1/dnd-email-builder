import generateEmailCode from '../data/contentGenerators';
import { CHANGE_GLOBAL_WIDTH, CHANGE_BACKGROUND_COLOR, ADD_BLOCK_TO_PREVIEW,
  REMOVE_BLOCK_FROM_PREVIEW, MOVE_BLOCK_IN_PREVIEW, CLEAR_MARKER_FROM_PREVIEW,
  MOVE_MARKER, REMOVE_ALL_BLOCKS_IN_PREVIEW, SELECT_COMPONENT,
  UPDATE_COMPONENT_VALUE } from '../actions/actions';


const emailPreviewState = {
  blocks: [],
  markerPresent: false,
  code: '',
  selected: null,
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
        markerPresent: true,
        blocks: temp,
        selected: null,
      });

    case ADD_BLOCK_TO_PREVIEW:
      temp = blocks.slice();

      // if the marker is present, replace the marker with the block in question
      if (state.markerPresent === true) {
        temp = temp.map((block) => {
          if (block.id === 'preview-panel-marker') {
            return action.block;
          }
          return block;
        });
      // if the marker is not present, append the block in question to the end
      } else {
        temp = temp.concat(action.block);
      }

      return Object.assign({}, state, {
        markerPresent: false,
        blocks: temp,
        code: generateEmailCode(temp),
        selected: null,
      });

    case REMOVE_BLOCK_FROM_PREVIEW:
      temp = blocks
        .slice(0, action.index)
        .concat(blocks.slice(action.index + 1))
      return Object.assign({}, state, {
          blocks: temp,
          code: generateEmailCode(temp),
          selected: null,
        }
      );

    case REMOVE_ALL_BLOCKS_IN_PREVIEW:
      return Object.assign({}, state, {
        markerPresent: false,
        blocks: [],
        code: '',
        selected: null,
      });

    case MOVE_BLOCK_IN_PREVIEW:
      const { sourceBlockId } = action;
      let blockToMove;

      // find the block by preview id and remove it
      temp = blocks.slice().filter((block) => {
        if (block.blockId === sourceBlockId) {
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
          markerPresent: false,
          blocks: temp,
          code: generateEmailCode(temp),
          selected: null,
        }
      );

    case CLEAR_MARKER_FROM_PREVIEW:
      return Object.assign({}, state, {
        markerPresent: false,
        blocks: blocks.slice().filter(block =>
          block.id !== 'preview-panel-marker'),
      });

    case SELECT_COMPONENT:
      let newSelected;
      if ((action.info === null) || (state.selected && (action.info.componentId === state.selected.componentId))) {
        newSelected = null;
      } else {
        newSelected = {
          blockId: action.info.blockId,
          componentId: action.info.componentId,
          componentOptions: action.info.componentOptions,
        }
      }
      return Object.assign({}, state, {
        selected: newSelected,
      });

    case UPDATE_COMPONENT_VALUE:
      const { componentInfo, property, value } = action;
      let updatedComponent;
      temp = blocks.slice().map((block) => {
        // find the block in question
        if (block.blockId === componentInfo.blockId) {
          // find the relevant component in the block
          block.content.map((component) => {
            if (component.componentId === componentInfo.componentId) {
              // update the value
              component[property] = value;
            }
            updatedComponent = component;
            return component;
          })
        }
        return block;
      });

      return Object.assign({}, state, {
        blocks: temp,
        code: generateEmailCode(temp),
        selected: Object.assign({}, state.selected, {componentOptions: updatedComponent}),
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
