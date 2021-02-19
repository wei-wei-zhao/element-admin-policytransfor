/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const othermanageRouter = {
  path: '/othermanage',
  component: Layout,
  redirect: '/othermanage/ossurl',
  name: 'othermanage',
  meta: {
    title: '其他管理	',
    icon: 'edit'
    // affix: true
  },
  children: [
    {
      path: 'ossurl',
      name: 'ossurl',
      component: () => import('@/views/othermanage/ossurl/index'),
      meta: { title: '图片管理' }
    }
  ]
}

export default othermanageRouter
