import request from '@/utils/request'

// 获取路由
export function getRoutes() {
  return request({
    url: '/vue-element-admin/routes',
    method: 'get'
  })
}
// 获取所有角色
export function getRoles() {
  return request({
    url: '/vue-element-admin/roles',
    method: 'get'
  })
}
// 新增角色
export function addRole(data) {
  return request({
    url: '/vue-element-admin/role',
    method: 'post',
    data
  })
}
// 跟新角色
export function updateRole(id, data) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'put',
    data
  })
}
// 删除角色
export function deleteRole(id) {
  return request({
    url: `/vue-element-admin/role/${id}`,
    method: 'delete'
  })
}
