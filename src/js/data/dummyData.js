export default {
  currentTab: 'Blocks',
  currentCategory: null,
  blocks: [
    {
      info: {
        name: 'one-column',
        icon: 'img/one-col.png'
      },
      modules: [
        {
        name: 'button',
        image: 'img/one-col/button.png',
        },
        {
        name: 'normal text',
        image: 'img/one-col/button.png',
        },
      ]
    },
    {
      info: {
        name: 'two-column',
        icon: 'img/two-col.png'
      },
      modules: [
        {
        name: 'text left, image right',
        image: 'img/two-col/textleftimageright.png',
        },
        {
        name: 'image left, text right',
        image: 'img/two-col/imagelefttextright.png',
        },
      ]
    }
  ]
}
