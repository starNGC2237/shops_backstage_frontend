import request from '@/utils/request'

export function allFeedBack() {
  return request.get('/feedBack/allFeedBack')
}
