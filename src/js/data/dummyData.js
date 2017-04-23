export default {
  currentTab: 'Blocks',
  currentCategory: null,
  emailBlocks: {
    isFetching: false,
    categories: [
      {
        name: 'one-column',
        image: 'img/one-col.png',
        blocks: [
          {
          name: 'button',
          image: 'img/one-col/button.png'
          },
          {
          name: 'normal text',
          image: 'img/one-col/button.png'
          },
          {
          name: 'headline text',
          image: 'img/one-col/headlinetext.png'
          }
        ]
      },
      {
        name: 'two-column',
        image: 'img/two-col.png',
        blocks: [
          {
          name: 'text left, image right',
          image: 'img/two-col/textleftimageright.png'
          },
          {
          name: 'image left, text right',
          image: 'img/two-col/imagelefttextright.png'
          }
        ]
      }
    ]
  }
}
