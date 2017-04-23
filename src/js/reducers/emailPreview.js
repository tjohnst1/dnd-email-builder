import { CHANGE_GLOBAL_WIDTH, CHANGE_BACKGROUND_COLOR, ADD_MODULE_TO_PREVIEW, REMOVE_MODULE_FROM_PREVIEW } from '../actions/actions';

const testState = [
  {
    "name": "Preheader",
    "image": "img/modules/one-column/preheader.png",
    "category": "one-column",
    "id": "m1",
    "content": [{
      "type": "text",
      "color": "#828282",
      "fontFamily": "Helvetica, Arial, sans-serif",
      "fontSize": "10px",
      "lineHeight": "12px",
      "textAlign": "center",
      "innerContent": "This is some text."
    }]
  },
  {
    "name": "Full Width Image",
    "image": "img/modules/one-column/full-width-image.png",
    "category": "one-column",
    "id": "m2",
    "content": [{
      "type": "image",
      "link": true,
      "src": "http://placehold.it/576x200",
      "width": "576"
    }]
  },
]

const emailPreviewState = {
  modules: testState,
}

export function emailPreview(state = emailPreviewState, action) {
  const modules = state.modules;
  switch (action.type) {
    case ADD_MODULE_TO_PREVIEW:
      return {
        modules: modules
          .slice(0, action.index)
          .concat(action.module)
          .concat(modules.slice(action.index)),
      };
    case REMOVE_MODULE_FROM_PREVIEW:
      return { modules: modules
        .slice(0, action.index)
        .concat(modules.slice(action.index + 1)),
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
