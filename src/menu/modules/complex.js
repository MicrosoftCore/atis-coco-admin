// [综合] 菜单
import component from '@/pages/complex'

export default {
  path: '/complex',
  name: 'complex',
  component,
  redirect: { name: 'complex-index' },
  meta: {
    title: '综合',
    icon: '综合',
    roles: [ 'admin', 'expert' ]
  },
  children: [
    { path: 'index', name: 'complex-index', component: () => import('@/pages/demo/business/index/index.vue') },
    {
      path: 'article',
      name: 'complex-article',
      component,
      redirect: { name: 'complex-article-index' },
      meta: {
        title: '文章库',
        roles: [ 'admin', 'expert' ]
      },
      children: [
        { path: 'index', name: 'complex-article-index', component: () => import('@/pages/complex/article') },
        {
          path: 'article/preview',
          name: 'complex-article-preview',
          component: () => import('@/pages/complex/article/components/Preview')
        }
      ]
    },
    {
      path: 'repository',
      name: 'complex-repository',
      component,
      redirect: { name: 'complex-repository-index' },
      meta: {
        title: '知识库',
        roles: [ 'admin', 'expert' ]
      },
      children: [
        { path: 'index', name: 'complex-repository-index', component: () => import('@/pages/complex/repository') },
        {
          path: 'graphic/add',
          name: 'complex-repository-graphic-add',
          component: () => import('@/pages/complex/repository/components/GraphicList/components/GraphicAdd')
        },
        {
          path: 'graphic/preview',
          name: 'complex-repository-graphic-preview',
          component: () => import('@/pages/complex/repository/components/GraphicList/components/Preview')
        },
        {
          path: 'video/add',
          name: 'complex-repository-video-add',
          component: () => import('@/pages/complex/repository/components/VideoList/components/VideoAdd')
        }
      ]
    }
  ]
}
