export default {
  currentTab: 'Blocks',
  currentCategory: null,
  emailModules: {
    isFetching: false,
    categories: [
      {
        name: 'one-column',
        image: 'img/one-col.png',
        modules: [
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
        modules: [
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
