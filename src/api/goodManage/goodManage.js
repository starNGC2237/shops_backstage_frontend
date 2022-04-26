import request from '@/utils/request'

export function allGood(params) {
  return request.post('/good/search', params, { type: 'json' })
}
