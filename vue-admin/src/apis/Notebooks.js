import request from '../utils/request'
import Auth from './Auth'

const URL = {
  GET: '/notebooks',
  ADD: '/notebooks',
  DELETE: '/notebooks/:notebookId'
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
  },
  deletenotebook({notebookId}) {
    return request(URL.DELETE.replace(':notebookId', notebookId), 'DELETE')
  }
}