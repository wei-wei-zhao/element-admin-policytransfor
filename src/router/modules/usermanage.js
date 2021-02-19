/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const usermanageRouter = {
  path: '/usermanage',
  component: Layout,
  redirect: '/usermanage/usernamepsd',
  name: 'usermanage',
  meta: {
    title: '用户管理',
    icon: 'people'
    // affix: true
  },
  children: [
    {
      path: 'usernamepsd',
      name: 'usernamepsd',
      component: () => import('@/views/usermanage/usernamepsd/index'),
      meta: { title: '用户名与密码设置' }
    },
    {
      path: 'authority',
      name: 'authority',
      component: () => import('@/views/usermanage/authority/index'),
      meta: { title: '用户权限配置' }
    }
  ]
}

export default usermanageRouter
