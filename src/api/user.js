import request from '@/utils/request'

export function login(data) {
  return request.post('/user/login', data, { type: 'json' })
  /*
  * return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
  * */
}

export function getInfo() {
  return request.get('/user/userInfo')
  /*
  * return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
  * */
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
