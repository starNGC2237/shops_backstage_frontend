import request from '@/utils/request'

export function getRegisterUsers() {
  return request.get('/express/statistics/registerUsers')
}
export function getStatisticsFeedBack() {
  return request.get('/express/statistics/feedBack')
}
