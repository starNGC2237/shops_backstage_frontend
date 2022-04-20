import request from '@/utils/request'

export function allUser(role) {
  return request.get('/user/info', { params: { role }})
}
