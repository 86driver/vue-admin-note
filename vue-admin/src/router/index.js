import Vue from 'vue'
import Router from 'vue-router'
import Layout from 'components/Layout'
import Notebooks from '../views/Notebooks'
import Notes from '../views/Notes'
import Trash from '../views/Trash'
import Charts from '../views/Charts'
import Login from '../views/Login'
import Auth from '../apis/Auth'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/login',
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
        },
        {
          path: 'charts',
          component: Charts
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {
    // 登录权限验证
    Auth.getInfo()
      .then((res) => {
        if (res.isLogin === true) {
          next()
        } else {
          next('/login')
        }
      })
      .catch(() => {
        alert('出错了')
      })
  } else {
    next()
  }
})

export default router