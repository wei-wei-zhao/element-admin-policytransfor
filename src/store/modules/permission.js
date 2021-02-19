// import { asyncRoutes, constantRoutes } from '@/router'
import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const defaultConfigRoutes = {
  veryfyimg: [
    {
      path: 'veryfyimgpage',
      component: () => import('@/views/policymanage/veryfyimg/veryfyimgpage'),
      name: 'veryfyimgpage',
      meta: { title: '保单图片审核' },
      hidden: true
    }
  ],
  inputdata: [
    {
      path: 'inputdatapage',
      name: 'inputdatapage',
      component: () => import('@/views/policymanage/inputdata/inputdatapage'),
      meta: { title: '保单信息录入' },
      hidden: true
    }
  ]
}

// 比对服务器返回 地址标识 返回路由列表
export function filterAsyncRoutesNew(asyncRoutes, routes) {
  const res = []

  function recursive(asyncRoutes, routes, parent) {
    asyncRoutes.forEach((route, index) => {
      // const tmp = { ...route }
      const newRoute = hasPermissionNew(routes, route)
      if (newRoute) {
        if (parent) {
          if (index === 0) {
            parent.children = []
          }
          parent.children.push(newRoute)
          if (newRoute.name === 'veryfyimg') { // 子类页面需要同时增加的页面
            parent.children.push(...defaultConfigRoutes['veryfyimg'])
          }
          if (newRoute.name === 'inputdata') { // 子类页面需要同时增加的页面
            parent.children.push(...defaultConfigRoutes['inputdata'])
          }
        } else {
          res.push(newRoute)
        }
        if (newRoute.children) {
          recursive(newRoute.children, routes, newRoute)
        }
      }
    })
  }
  recursive(asyncRoutes, routes)

  return res
}
// 校验路由是否包含在 服务返回的路由配置中
function hasPermissionNew(rolesRoute, route) {
  if (rolesRoute.indexOf(route.name) > -1) {
    return route
  }
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, userRoleRoute) {
    return new Promise(resolve => {
      let accessedRoutes
      const { routes } = userRoleRoute
      // userRoleRoute
      accessedRoutes = asyncRoutes || []
      accessedRoutes = filterAsyncRoutesNew(asyncRoutes, routes)
      // if (roles.includes('admin')) {
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }

      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
