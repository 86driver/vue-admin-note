import request from '../utils/request'
import Auth from './Auth'

const URL = {
  GET: '/notebooks',
  ADD: '/notebooks'
}

export default {
  getNotebooks() {
    return Auth.getInfo()
            .then(res => {
              if (res.isLogin) {
                return request(URL.GET)
              }
            })
            .catch((error) => {
              console.log(error)
            })
  },
  addNotebooks({title = ''}) {
    return Auth.getInfo()
            .then(res => {
              if (res.isLogin) {
                return request(URL.ADD, 'POST', {title})
              }
            })
            .catch((error) => {
              console.log(error)
            })
  }
}