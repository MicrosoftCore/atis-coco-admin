// [工作台] 菜单
import component from '@/pages/bench'

export default {
  path: '/bench',
  name: 'bench',
  component,
  redirect: { name: 'bench-index' },
  meta: {
    title: '工作台',
    icon: '标签',
    roles: [ 'admin', 'expert' ]
  },
  children: [
    { path: 'index', name: 'bench-index', component: () => import('@/pages/demo/business/index/index.vue') },
    {
      path: 'initial',
      name: 'bench-initial',
      component,
      redirect: { name: 'bench-initial-index' },
      meta: {
        title: '初检单',
        roles: [ 'admin' ]
      },
      children: [
        { path: 'index', name: 'bench-initial-index', component: () => import('@/pages/bench/initial') },
        {
          path: 'detection',
          name: 'bench-initial-detection',
          component: () => import('@/pages/bench/initial/components/DetectionInitial')
        },
        {
          path: 'merge',
          name: 'bench-initial-merge',
          component: () => import('@/pages/bench/initial/components/MergeInitial')
        }
      ]
    },
    {
      path: 'final',
      name: 'bench-final',
      component,
      redirect: { name: 'bench-final-index' },
      meta: {
        title: '终检单',
        roles: [ 'admin', 'expert' ]
      },
      children: [
        { path: 'index', name: 'bench-final-index', component: () => import('@/pages/bench/final') },
        {
          path: 'info',
          name: 'bench-final-info',
          component: () => import('@/pages/bench/final/components/DetectionInfo')
        },
        {
          path: 'detection',
          name: 'bench-final-detection',
          component: () => import('@/pages/bench/final/components/DetectionFinal')
        }
      ]
    }
  ]
}
