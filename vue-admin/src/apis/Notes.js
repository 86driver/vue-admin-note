import request from '../utils/request'
import Auth from './Auth'

const URL = {
  GET: '/notes/from/:notebookId',
  ADD: '/notes/to/:notebookId',
  UPDATE: '/notes/:noteId',
  DELETE: '/notes/:noteId'
}

export default {
  getAllNotes({notebookId}) {
    return Auth.getInfo()
            .then(res => {
              if (res.isLogin) {
                return request(URL.GET.replace(':notebookId', notebookId))
              }
            })
            .catch((error) => {
              console.log(error)
            })
  },
  addNote({notebookId}, {title, content}) {
    return Auth.getInfo()
            .then(res => {
              if (res.isLogin) {
                return request(URL.ADD.replace(':notebookId', notebookId), 'POST', {title, content})
              }
            })
            .catch((error) => {
              console.log(error)
            })
  },
  updateNote({noteId, title, content}) {
    return request(URL.UPDATE.replace(':noteId', noteId), 'PATCH', {title, content})
  },
  deleteNote({noteId}) {
    return request(URL.DELETE.replace(':noteId', noteId), 'DELETE')
  }
}