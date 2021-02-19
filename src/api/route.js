import request from '@/utils/request'

export function getRoute(token) {
  return request({
    url: '/vue-element-admin/routes',
    method: 'get',
    params: { token }
  })
}
