export default {
  items: [
    {
      title: true,
      name: 'Admin',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Users',
      url: '/user',
      icon: 'icon-star',
      type: 'item'
    },
    {
      name: 'Roles',
      url: '/role',
      icon: 'icon-star',
      type: 'item'
    },
    {
      name: 'Permissions',
      url: '/permission',
      icon: 'icon-star',
      type: 'item'
    },
    {
      name: 'Gallery',
      url: '/gallery',
      icon: 'icon-star',
      type: 'item',
      children: [
        {
          name: 'Category',
          url: '/gallerycategory',
          icon: 'icon-layers',
          type: 'item'
        },
        {
          name: 'Picture',
          url: '/gallerypicture',
          icon: 'icon-layers',
          type: 'item'
        }
      ],
    }
  ]
};
