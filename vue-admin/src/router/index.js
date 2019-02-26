import Vue from 'vue'
import Router from 'vue-router'
import Layout from 'components/Layout'
import Notebooks from '../views/Notebooks'
import Notes from '../views/Notes'
import Trash from '../views/Trash'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: 'notebooks',
          component: Notebooks
        },
        {
          path: 'notes',
          component: Notes
        },
        {
          path: 'trash',
          component: Trash
        }
      ]
    }
  ]
})
