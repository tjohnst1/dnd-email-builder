import { CHANGE_GLOBAL_WIDTH, CHANGE_BACKGROUND_COLOR } from '../actions/actions';

const testState = [
  {
    "name": "Preheader",
    "image": "img/modules/one-column/preheader.png",
    "type": "one-column",
    "content":
      [{
        "type": "text",
        "color": "#828282",
        "fontFamily": "Helvetica, Arial, sans-serif",
        "fontSize": "10px",
        "lineHeight": "12px",
        "textAlign": "center",
        "innerContent": "This is a test"
      }],
  },
  {
  "name": "Full Width Image",
  "image": "img/modules/one-column/full-width-image.png",
  "type": "one-column",
  "content": [
    {
      "type": "image",
      "link": true,
      "src": "http://placehold.it/576x200",
      "width": "576"
    }]
  },
]

const emailPreviewState = {
  modules: testState
}

export function emailPreview(state = emailPreviewState, action) {
  switch (action.type) {
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
