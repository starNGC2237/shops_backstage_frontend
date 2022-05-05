import request from '@/utils/request'

export function allGood(params) {
  return request.post('/good/search', params, { type: 'json' })
}
export function getAllGoodInfo() {
  return request.get('/good/allInfo')
}
export function addGood(params) {
  return request.post('/good/add', params, { type: 'json' })
}
