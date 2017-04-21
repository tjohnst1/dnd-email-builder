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
  modules: testState,
  globalOptions: {
    backgroundColor: "#ffffff",
    overallWidth: "640",
    defaultFont: "Helvetica, Arial, sans-serif",
  }
}

export function emailPreview(state = emailPreviewState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
