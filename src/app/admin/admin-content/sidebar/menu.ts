export const MENU = [
  {
    id: 1,
    label: 'Article',
    icon: 'carbon:book',
    expand: true,
    subItems: [
      {
        id: 2,
        label: 'Posts',
        link: 'articles',
      },
      {
        id: 3,
        label: 'Categories',
        link: 'articles/categories',
      },
      {
        id: 4,
        label: 'Tags',
        link: 'articles/tags',
      },
    ],
  },
  {
    id: 5,
    label: 'Books',
    link: 'admin/books',
    icon: 'ri-apps-2-line',
  },
  {
    id: 6,
    label: 'Gallery',
    icon: 'clarity:image-gallery-solid',
    expand: false,
    subItems: [
      {
        id: 7,
        label: 'Photos',
        link: 'gallery/photos',
      },
      {
        id: 8,
        label: 'Categories',
        link: 'gallery/categories',
      },
      {
        id: 9,
        label: 'Videos',
        link: 'gallery/youtube',
      },
    ],
  },
  {
    id: 10,
    label: 'Magazine',
    icon: 'icomoon-free:file-pdf',
    link: 'admin/magazine',
  },
  {
    id: 11,
    label: 'Contact Us',
    icon: 'mdi:card-account-mail-outline',
    link: 'admin/contact-us',
  },
  {
    id: 12,
    label: 'Testimonial',
    icon: 'dashicons:testimonial',
    link: 'admin/testimonial',
  },
  {
    id: 13,
    label: 'Subscribers',
    icon: 'dashicons:email-alt',
    link: 'admin/subscribers',
  },
];
