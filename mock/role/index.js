const Mock = require('mockjs')
const { deepClone ,initRoutes} = require('../utils')
// debugger
const { asyncRoutes, constantRoutes } = require('../routes/routes.js')
// const { configRouter } = require('./router.config.js')
const routers = require('../routes/router.config.js')
// const routes = deepClone([...constantRoutes, ...asyncRoutes])

const routes = deepClone([...constantRoutes, ...asyncRoutes])

// routes = initRoutes(routes, configRouter);
const newRoutes = initRoutes(routes);


const roles = [
  {
    routers,
    key: 'admin',
    name: 'admin',
    description: '主管员',
    routes: routes
  },
  {
    routers,
    key: 'editor',
    name: 'editor',
    description: '编辑者',
    routes: routes.filter(i => i.path !== '/permission')// just a mock
  },
  {
    key: 'visitor',
    name: 'visitor',
    description: '查看者',
    routers,
    routes: [{
      path: '',
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: { title: 'dashboard', icon: 'dashboard' }
        }
      ]
    }]
  }
]

module.exports = [
  // 获取所有路径r
  // {
  //   url: '/vue-element-admin/roles',
  //   type: 'get',
  //   response: _ => {
  //     return {
  //       code: 20000,
  //       data: roles
  //     }
  //   }
  // },

  // 获取所有角色
  {
    url: '/vue-element-admin/roles',
    type: 'get',
    response: _ => {
      debugger
      return {
        code: 20000,
        data: roles
      }
    }
  },

  // 新增
  {
    url: '/vue-element-admin/role',
    type: 'post',
    response: {
      code: 20000,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },

  // 更新角色
  {
    url: '/vue-element-admin/role/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },

  // 删除角色
  {
    url: '/vue-element-admin/role/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  }
]
