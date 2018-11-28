export default [
  {
    title: 'Quản lý nghệ sĩ',
    key: 'artistManagement',
    icon: 'icmn icmn-users',
    children: [
      {
        title: 'Danh sách nghệ sĩ',
        key: 'artistList',
        url: '/artist',
      },
      {
        title: 'Tạo mới nghệ sĩ',
        key: 'create_artist',
        url: '/artist/create',
      },
    ]
  }
  // {
  //   title: 'Empty Page',
  //   key: 'empty',
  //   url: '/empty',
  //   icon: 'icmn icmn-books',
  // },
]
