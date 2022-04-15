import request from '@/utils/request'

export function getAllCategory() {
  return request.get('/express/category/getAllCategory')
}
