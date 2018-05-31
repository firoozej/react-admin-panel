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
      name: 'Content',
      icon: 'icon-star',
      children: [
        {
          name: 'Category',
          url: '/category',
          icon: 'icon-layers',
          type: 'item'
        },
        {
          name: 'Item',
          url: '/item',
          icon: 'icon-layers',
          type: 'item'
        }
      ],
    }
  ]
};
