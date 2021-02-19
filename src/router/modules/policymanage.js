/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const policymanageRouter = {
  path: '/policymanage',
  component: Layout,
  redirect: '/policymanage/pending/verifypendingsch',
  name: 'policymanage',
  meta: {
    title: '保单管理',
    icon: 'form'
    // affix: true
  },

  // {
  // path: '/',
  // component: Layout,
  // redirect: '/dashboard',
  // children: [
  //   {
  //     path: 'dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     name: 'Dashboard',
  //     meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
  //   }
  // ]
  // },

  children: [
    {
      path: 'pending',
      component: () => import('@/views/policymanage/pending/index'), // Parent router-view
      name: 'pending',
      meta: { title: '待处理任务查看' },
      redirect: '/policymanage/pending/verifypendingsch',
      children: [
        {
          path: 'verifypendingsch',
          component: () => import('@/views/policymanage/pending/verifypendingsch'),
          name: 'verifypendingsch',
          meta: { title: '待审核数据查询' }
        },
        {
          path: 'inputpendingsch',
          component: () => import('@/views/policymanage/pending/inputpendingsch'),
          name: 'inputpendingsch',
          meta: { title: '待录入数据查询' }
        },
        {
          path: 'checkbackpendingsch',
          component: () => import('@/views/policymanage/pending/checkbackpendingsch'),
          name: 'checkbackpendingsch',
          meta: { title: '抽检打回待处理查询' }
        }
      ]
    },
    {
      path: 'veryfyimg',
      name: 'veryfyimg',
      component: () => import('@/views/policymanage/veryfyimg/index'),
      meta: { title: '保单图片审核' }
    },
    {
      path: 'veryfyimgpage',
      component: () => import('@/views/policymanage/veryfyimg/veryfyimgpage'),
      name: 'veryfyimgpage',
      meta: { title: '保单图片审核' },
      hidden: true
    },
    {
      path: 'inputdata',
      name: 'inputdata',
      component: () => import('@/views/policymanage/inputdata/index'),
      meta: { title: '保单信息录入' }
    },
    {
      path: 'inputdatapage',
      name: 'inputdatapage',
      component: () => import('@/views/policymanage/inputdata/inputdatapage'),
      meta: { title: '保单信息录入' }
    },
    {
      path: 'datamodify',
      name: 'datamodify',
      component: () => import('@/views/policymanage/datamodify/index'),
      meta: { title: '保单查看修改' }
    },
    {
      path: 'checkdevopsmodify',
      name: 'checkdevopsmodify',
      component: () => import('@/views/policymanage/checkdevopsmodify/index'),
      meta: { title: '抽检运维修改' }
    },
    {
      path: 'checkdata',
      name: 'checkdata',
      component: () => import('@/views/policymanage/checkdata/index'),
      meta: { title: '保单信息抽检' },
      redirect: '/policymanage/checkdata/checkdatasch',
      children: [
        {
          path: 'checkdatasch',
          component: () => import('@/views/policymanage/checkdata/checkdatasch'),
          name: 'checkdatasch',
          meta: { title: '已抽检数据查询' }
        },
        {
          path: 'nocheckdatasch',
          component: () => import('@/views/policymanage/checkdata/nocheckdatasch'),
          name: 'nocheckdatasch',
          meta: { title: '未抽检数据查询' }
        }
      ]
    },
    {
      path: 'errdata',
      name: 'errdata',
      component: () => import('@/views/policymanage/errdata/index'),
      meta: { title: '保单异常数据' },
      redirect: '/policymanage/errdata/verifyerrdata',
      children: [
        {
          path: 'verifyerrdata',
          component: () => import('@/views/policymanage/errdata/verifyerrdata'),
          name: 'verifyerrdata',
          meta: { title: '审核异常数据' }
        },
        {
          path: 'inputerrdata',
          component: () => import('@/views/policymanage/errdata/inputerrdata'),
          name: 'inputerrdata',
          meta: { title: '录入异常数据' }
        }
      ]
    }
  ]
}

export default policymanageRouter
