import request from '@/utils/request'

export function allOrder(orderStatus) {
  return request.get('/order/allOrder', { params: { orderStatus }})
}
export function deliver(orderName) {
  return request.get('/order/deliver', { params: { orderName }})
}
