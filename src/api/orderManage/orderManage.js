import request from '@/utils/request'

export function allOrder(orderStatus) {
  return request.get('/order/allOrder', { params: { orderStatus }})
}
export function deliver(orderName, isCarry) {
  return request.get('/order/deliver', { params: { orderName, isCarry }})
}
