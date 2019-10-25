export default [
  {
    path: '/',
    component: () => import('@/components/frame/main'),
    redirect: {
      name: 'index'
    },
    children: [
      {
        path: 'index',
        name: 'index',
        meta: {
          requiresAuth: true
        },
        component: () => import('@/pages/core/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/core/login')
  }
]
