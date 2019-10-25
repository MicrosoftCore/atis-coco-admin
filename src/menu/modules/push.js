// [推送] 菜单
import component from '@/pages/push'

export default {
  path: '/push',
  name: 'push',
  component,
  redirect: { name: 'push-index' },
  meta: {
    title: '推送',
    icon: '推送',
    roles: [ 'admin' ]
  },
  children: [
    { path: 'index', name: 'push-index', component: () => import('@/pages/demo/business/index/index.vue') },
    {
      path: 'article',
      name: 'push-article',
      component,
      redirect: { name: 'push-article-index' },
      meta: {
        title: '文章推送'
      },
      children: [ { path: 'index', name: 'push-article-index', component: () => import('@/pages/push/article') } ]
    }
  ]
}
