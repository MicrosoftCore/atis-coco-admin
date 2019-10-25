// [专家] 菜单
import component from '@/pages/expert'

export default {
  path: '/expert',
  name: 'expert',
  component,
  redirect: { name: 'expert-index' },
  meta: {
    title: '专家',
    icon: '专家',
    roles: [ 'expert' ]
  },
  children: [
    { path: 'index', name: 'expert-index', component: () => import('@/pages/demo/business/index/index.vue') },
    {
      path: 'article',
      name: 'expert-article',
      component,
      redirect: { name: 'expert-article-index' },
      meta: {
        title: '我的文章'
      },
      children: [
        { path: 'index', name: 'expert-article-index', component: () => import('@/pages/expert/article') },
        {
          path: 'graphic/add',
          name: 'expert-article-graphic-add',
          component: () => import('@/pages/expert/article/components/GraphicList/components/GraphicAdd')
        },
        {
          path: 'graphic/preview',
          name: 'expert-article-graphic-preview',
          component: () => import('@/pages/expert/article/components/GraphicList/components/Preview')
        },
        {
          path: 'video/add',
          name: 'expert-article-video-add',
          component: () => import('@/pages/expert/article/components/VideoList/components/VideoAdd')
        }
      ]
    },
    {
      path: 'history',
      name: 'final-history',
      component,
      redirect: { name: 'expert-history-index' },
      meta: {
        title: '终检历史',
        roles: [ 'expert' ]
      },
      children: [
        { path: 'index', name: 'expert-history-index', component: () => import('@/pages/expert/final') },
        {
          path: 'info',
          name: 'expert-final-info',
          component: () => import('@/pages/expert/final/components/DetectionInfo')
        }
      ]
    }
  ]
}
