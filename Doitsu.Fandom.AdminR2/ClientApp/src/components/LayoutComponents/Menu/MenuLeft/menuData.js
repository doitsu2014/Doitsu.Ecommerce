export default [
  {
    title: 'Dashboard Alpha',
    key: 'dashboardAlpha',
    url: '/dashboard/alpha',
    icon: 'icmn icmn-stack',
  },
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
    ]
  }
  // {
  //   title: 'Empty Page',
  //   key: 'empty',
  //   url: '/empty',
  //   icon: 'icmn icmn-books',
  // },
]
