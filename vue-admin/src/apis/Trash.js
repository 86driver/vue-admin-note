import request from '../utils/request'

const URL = {
  GET: '/notes/trash',
  REVERT: '/notes/:noteId/revert',
  DELETE: '/notes/:noteId/confirm'
}

export default {
  getTrash() {
    return request(URL.GET)
  },
  deleteNote({noteId}) {
    return request(URL.DELETE.replace(':noteId', noteId), 'DELETE')
  },
  revertNote({noteId}) {
    return request(URL.REVERT.replace(':noteId', noteId), 'PATCH')
  }
}