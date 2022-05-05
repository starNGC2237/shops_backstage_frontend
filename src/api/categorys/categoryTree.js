import request from '@/utils/request'

export function getAllCategory() {
  return request.get('/express/category/getAllCategory')
}
export function deleteCategory(categoryId) {
  return request.get('/category/delete', { params: { categoryId }})
}
export function addCategory(params) {
  return request.post('/category/add', params, { type: 'json' })
}
export function reviseCategory(params) {
  return request.post('/category/revise', params, { type: 'json' })
}
export function mapCategory() {
  return request.get('/express/category/getAllCategory/map')
}
