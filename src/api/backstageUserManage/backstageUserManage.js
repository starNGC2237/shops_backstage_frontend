import request from '@/utils/request'

export function allUser(role) {
  return request.get('/user/info', { params: { role }})
}
export function getAllAreaMap() {
  return request.get('/express/area/all/map')
}
export function createStore(params) {
  return request.post('/user/createStore', params, { type: 'json' })
}
