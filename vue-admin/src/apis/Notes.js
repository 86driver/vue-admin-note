import request from '../utils/request'

const URL = {
  GET: '/notes/from/:notebookId',
  ADD: '/notes/to/:notebookId',
  UPDATE: '/notes/:noteId',
  DELETE: '/notes/:noteId'
}

export default {
  getAllNotes({notebookId}) {
    return request(URL.GET.replace(':notebookId', notebookId))
  },
  addNote({notebookId}, {title, content}) {
    return request(URL.ADD.replace(':notebookId', notebookId), 'POST', {title, content})
  },
  updateNote({noteId, title, content}) {
    return request(URL.UPDATE.replace(':noteId', noteId), 'PATCH', {title, content})
  },
  deleteNote({noteId}) {
    return request(URL.DELETE.replace(':noteId', noteId), 'DELETE')
  }
}