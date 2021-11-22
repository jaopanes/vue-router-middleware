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
    component: () => import(/* webpackChunkName: "layout" */ '../layout/TheLayout.vue'),
    children: [
      {
        path: '',
        component: () => import(/* webackChunkName: "userhome" */ '../views/private/TheUser.vue'),
        name: 'User',
        meta: {
          middleware: [auth, log]
        }
      },
      {
        path: 'configurations',
        component: () => import(/* webackChunkName: "userconfigurations" */ '../views/private/TheConfigurations.vue'),
        name: 'Configurations',
        meta: {
          middleware: auth
        }
      },
    ]
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
  if (to.meta.middleware || to.matched.some(record => record.meta.middleware)) {
    const fieldMiddleware = to.meta.middleware || to.matched.filter(record => record.meta.middleware)[0].meta.middleware
    const middleware = Array.isArray(fieldMiddleware) ? fieldMiddleware : [fieldMiddleware]

    const context = {
      from, next, router, to
    }

    const nextMiddleware = nextFactory(context, middleware, 1)
    return middleware[0]({ ...context, next: nextMiddleware })
  }

  return next()
})

export default router
