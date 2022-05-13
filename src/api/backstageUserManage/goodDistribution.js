import request from '@/utils/request'

export function addNumber(goodId, number, operate, userName) {
  return request.get('/good/number', { params: { goodId, number, operate, userName }})
}
