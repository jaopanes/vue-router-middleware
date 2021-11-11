import Vue from 'vue'
import VueRouter from 'vue-router'

/**
 * Middlewares
 */
import { auth, log, guest } from './middleware'

Vue.use(VueRouter)

const routes = [
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "privateuser" */ '../views/private/TheUser.vue'),
    meta: {
      middleware: [auth, log]
    }
  },
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "authlogin" */ '../views/auth/TheLogin.vue'),
    meta: {
      middleware: [guest, log]
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index]

  if (!subsequentMiddleware) return context.next;

  return (...params) => {
    context.next(...params)

    const nextMiddleware = nextFactory(context, middleware, index + 1)
    subsequentMiddleware({ ...context, next: nextMiddleware })
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware]

    const context = {
      from, next, router, to
    }

    const nextMiddleware = nextFactory(context, middleware, 1)
    return middleware[0]({ ...context, next: nextMiddleware })
  }

  return next()
})

export default router
