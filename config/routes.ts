export default [
  // {
  //   path: '/user',
  //   layout: false,
  //   routes: [
  //     {
  //       name: 'login',
  //       path: '/user/login',
  //       component: './user/Login',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    name: 'Scan',
    icon: 'scan',
    path: '/scan',
    component: './Scan',
  },
  {
    name: 'Stress Testing',
    icon: 'field-time',
    path: '/stress-testing',
    component: './StressTesting',
  },
  {
    name: 'Assets',
    icon: 'file-protect',
    path: '/assets',
    component: './Assets',
  },
  {
    name: 'Setting',
    icon: 'setting',
    path: '/setting',
    component: './Setting',
  },
  // {
  //   path: '/',
  //   redirect: '/welcome',
  // },
  {
    component: './404',
  },
];
