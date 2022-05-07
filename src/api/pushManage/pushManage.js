import request from '@/utils/request'

export function allAnnounce() {
  return request.get('/user/allAnnounce')
}
export function deleteAnnounce(announceId) {
  return request.get('/user/deleteAnnounce', { params: { announceId }})
}
export function reAnnounce(params) {
  return request.post('/user/reAnnounce', params, { type: 'json' })
}
export function addAnnounce(title, content) {
  return request.get('/user/addAnnounce', { params: { title, content }})
}
