import request from '@/utils/request'

export function allAnnounce() {
  return request.get('/user/allAnnounce')
}
export function deleteAnnounce(announceId) {
  return request.get('/user/deleteAnnounce', { params: { announceId }})
}
