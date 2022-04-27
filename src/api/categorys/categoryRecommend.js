import request from '@/utils/request'

export function categoryRecommended(params) {
  return request.post('/category/isRecommended', params, { type: 'json' })
}
