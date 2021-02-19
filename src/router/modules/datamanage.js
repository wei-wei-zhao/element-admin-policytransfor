/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const datamanageRouter = {
  path: '/datamanage',
  name: 'datamanage',
  component: Layout,
  redirect: '/datamanage/statiview/verifystatic',
  meta: {
    title: '数据管理	',
    icon: 'chart'
    // affix: true
  },
  children: [
    {
      path: 'statiview',
      name: 'statiview',
      component: () => import('@/views/datamanage/statiview/index'), // Parent router-view
      meta: { title: '统计数据查看' },
      redirect: '/datamanage/statiview/verifystatic',
      children: [
        {
          path: 'verifystatic',
          name: 'verifystatic',
          component: () => import('@/views/datamanage/statiview/verifystatic/index'),
          meta: { title: '审核数据统计' }
        },
        {
          path: 'inputstatic',
          name: 'inputstatic',
          component: () => import('@/views/datamanage/statiview/inputstatic/index'),
          meta: { title: '录入数据统计' }
        },
        {
          path: 'updatastatic',
          name: 'updatastatic',
          component: () => import('@/views/datamanage/statiview/updatastatic/index'),
          meta: { title: '业务上传量统计' }
        },
        {
          path: 'personalstatic',
          name: 'personalstatic',
          component: () => import('@/views/datamanage/statiview/personalstatic/index'),
          meta: { title: '个人作业数据统计' }
        },
        {
          path: 'cyclestatic',
          name: 'cyclestatic',
          component: () => import('@/views/datamanage/statiview/cyclestatic/index'),
          meta: { title: '批次周期统计' }
        }
      ]
    },
    {
      path: 'backstatic',
      name: 'backstatic',
      component: () => import('@/views/datamanage/backstatic/index'), // Parent router-view
      meta: { title: '打回数据查看' },
      redirect: '/datamanage/backstatic/verifybackstatic',
      children: [
        {
          path: 'verifybackstatic',
          name: 'verifybackstatic',
          component: () => import('@/views/datamanage/backstatic/verifybackstatic/index'),
          meta: { title: '保单审核数据打回查看' }
        },
        {
          path: 'inputbackstatic',
          name: 'inputbackstatic',
          component: () => import('@/views/datamanage/backstatic/inputbackstatic/index'),
          meta: { title: '录入打回数据详情查看' }
        },
        {
          path: 'checkbackstatic',
          name: 'checkbackstatic',
          component: () => import('@/views/datamanage/backstatic/checkbackstatic/index'),
          meta: { title: '抽检打回数据详细查询' }
        }
      ]
    }
  ]
}

export default datamanageRouter
