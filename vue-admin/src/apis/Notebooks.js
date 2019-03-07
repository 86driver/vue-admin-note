import request from '../utils/request'

const URL = {
  GET: '/notebooks',
  ADD: '/notebooks',
  DELETE: '/notebooks/:notebookId'
}

export default {
  getNotebooks() {
    return request(URL.GET)
  },
  addNotebooks({title = ''}) {
    return request(URL.ADD, 'POST', {title})
  },
  deletenotebook({notebookId}) {
    return request(URL.DELETE.replace(':notebookId', notebookId), 'DELETE')
  }
}