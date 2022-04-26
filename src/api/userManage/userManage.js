import request from '@/utils/request'

export function allUser(role) {
  return request.get('/user/info', { params: { role }})
}
export function disable(params) {
  return request.get('/user/disabled', { params })
}
