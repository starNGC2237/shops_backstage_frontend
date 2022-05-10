import request from '@/utils/request'

export function allGood(params) {
  return request.post('/good/search', params, { type: 'json' })
}
// 所有商品
export function getAllGoodInfo() {
  return request.get('/good/allInfo')
}
// 添加商品
export function addGood(params) {
  return request.post('/good/add', params, { type: 'json' })
}
// 删除商品
export function deleteGood(goodId) {
  return request.get('/good/delete', { params: { goodId }})
}
// 添加图片
export function addImage(goodId, file) {
  return request.post('/good/addImage', { params: { goodId, file }})
}
