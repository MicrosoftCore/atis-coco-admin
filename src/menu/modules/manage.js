// [管理] 菜单
import component from '@/pages/manage'

export default {
  path: '/manage',
  name: 'manage',
  component,
  redirect: { name: 'manage-index' },
  meta: {
    title: '管理',
    icon: '空盒子',
    roles: [ 'admin' ]
  },
  children: [
    { path: 'index', name: 'manage-index', component: () => import('@/pages/demo/business/index/index.vue') },
    // {
    //   path: 'message',
    //   name: 'manage-message',
    //   component,
    //   redirect: { name: 'manage-message-index' },
    //   meta: {
    //     title: '消息管理'
    //   },
    //   children: [ { path: 'index', name: 'manage-message-index', component: () => import('@/pages/manage/message') } ]
    // },
    {
      path: 'account',
      name: 'manage-account',
      component,
      redirect: { name: 'manage-account-index' },
      meta: {
        title: '用户管理'
      },
      children: [ { path: 'index', name: 'manage-account-index', component: () => import('@/pages/manage/account') } ]
    },
    {
      path: 'expert',
      name: 'manage-expert',
      component,
      redirect: { name: 'manage-expert-index' },
      meta: {
        title: '专家管理'
      },
      children: [ { path: 'index', name: 'manage-expert-index', component: () => import('@/pages/manage/expert') } ]
    },
    {
      path: 'farmer',
      name: 'manage-farmer',
      component,
      redirect: { name: 'manage-farmer-index' },
      meta: {
        title: '农户管理'
      },
      children: [
        { path: 'index', name: 'manage-farmer-index', component: () => import('@/pages/manage/farmer') },
        {
          path: 'info',
          name: 'manage-farmer-info',
          component: () => import('@/pages/manage/farmer/components/FarmerInfo')
        },
        {
          path: 'orderdetail',
          name: 'manage-farmer-orderdetail',
          component: () => import('@/pages/manage/farmer/components/OrderDetail')
        }
      ]
    },
    {
      path: 'authentication',
      name: 'manage-authentication',
      component,
      redirect: { name: 'manage-authentication-index' },
      meta: {
        title: '推广员审核',
        roles: [ 'admin' ]
      },
      children: [
        { path: 'index', name: 'manage-authentication-index', component: () => import('@/pages/manage/authentication') }
      ]
    },
    {
      path: 'shop',
      name: 'manage-shop',
      component,
      redirect: { name: 'manage-shop-index' },
      meta: {
        title: '分院管理'
      },
      children: [
        {
          path: 'index',
          name: 'manage-shop-index',
          component: () => import('@/pages/manage/shop'),
          meta: {
            title: '商户列表'
          }
        },
        {
          path: 'info',
          name: 'manage-shop-info',
          component: () => import('@/pages/manage/shop/components/ShopInfo')
        },
        {
          path: 'shopupload',
          name: 'manage-shop-shopupload',
          component: () => import('@/pages/manage/shop/components/ShopUpload'),
          meta: {
            title: '农资店上传列表'
          }
        },
        {
          path: 'shoppc',
          name: 'manage-shop-shoppc',
          component: () => import('@/pages/manage/shop/components/ShopPc'),
          meta: {
            title: '商户PC列表'
          }
        }
      ]
    }
    // {
    //   path: 'role',
    //   name: 'manage-role',
    //   component,
    //   redirect: { name: 'manage-role-index' },
    //   meta: {
    //     title: '角色管理'
    //   },
    //   children: [ { path: 'index', name: 'manage-role-index', component: () => import('@/pages/manage/role') } ]
    // },
    // {
    //   path: 'access',
    //   name: 'manage-access',
    //   component,
    //   redirect: { name: 'manage-access-index' },
    //   meta: {
    //     title: '权限管理'
    //   },
    //   children: [ { path: 'index', name: 'manage-access-index', component: () => import('@/pages/manage/access') } ]
    // }
  ]
}
