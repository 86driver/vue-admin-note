import Vue from 'vue'
import Router from 'vue-router'
import Layout from 'components/Layout'
import Notebooks from '../views/Notebooks'
import Notes from '../views/Notes'
import Trash from '../views/Trash'
import Login from '../views/Login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: 'notebooks',
      meta: {
        requireAuth: true
      },
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
    },
    {
      path: 'login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {
    // 这里this.a.app 相当于 Vue中的this
    if (this.a.app.$storage.get('user')) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router