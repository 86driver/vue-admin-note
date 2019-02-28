import request from '../utils/request'

const URL = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register'
}

export default{
  login({username, password}) {
    return request(URL.LOGIN, 'POST', {
      username,
      password
    })
  },
  register({username, password}) {
    return request(URL.REGISTER, 'POST', {
      username,
      password
    })
  }
}