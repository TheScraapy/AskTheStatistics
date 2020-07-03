import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Index from '@/components/Index.vue'
import Home from '@/components/Home.vue'
import Wages from '@/components/Wages.vue'
import Grades from '@/components/Grades.vue'
import Lol from '@/components/Lol.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/wages',
      name: 'Wages',
      component: Wages,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/grades',
      name: 'Grades',
      component: Grades,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/lol',
      name: 'Lol',
      component: Lol,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
    next({ name: 'Index' })
  } else {
    next()
  }
})

export default router
