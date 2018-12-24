export default [
  {
    title: 'Quản lý nghệ sĩ',
    key: 'artistManagement',
    icon: 'icmn icmn-users',
    children: [
      {
        title: 'Danh sách nghệ sĩ',
        icon: 'icmn icmn-list',
        key: 'artistList',  
        url: '/artist',
      },
      {
        title: 'Tạo mới nghệ sĩ',
        icon: 'icmn icmn-user-plus',
        key: 'create_artist',
        url: '/artist/create',
      },
    ]
  },
  {
    title: 'Quản lý album',
    key: 'albumManagement',
    icon: 'icmn icmn-folder-open',
    children: [
      {
        title: 'Danh sách album',
        icon: 'icmn icmn-list',
        key: 'albumList',
        url: '/album',
      },
      {
        title: 'Tạo mới album',
        icon: 'icmn icmn-folder-plus',        
        key: 'albumEdit',
        url: '/album/create',
      }
    ]
  }
  // {
  //   title: 'Empty Page',
  //   key: 'empty',
  //   url: '/empty',
  //   icon: 'icmn icmn-books',
  // },
]
