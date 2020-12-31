import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */'../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/opera',
    name: 'DoctorOpera',

    component: () => import('../views/DoctorOpera.vue')
  },
  {
    path: '/admin',
    name: 'Admin',

    component: () => import('../views/Admin.vue')
  },
  {
    path: '/organ/',
    name: 'organ',
    component: () => import('../views/Organ.vue')
  },
  {
    path: '/login',
    name: 'Login',

    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
]

const router = new VueRouter({
  routes
})


//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') {
    window.sessionStorage.clear();
    return next();
  }
  if (to.path === '/') {
    return next();
  }
  //获取token
  const tokenStr = window.sessionStorage.getItem('token');
  //无token强制跳转到登录页面
  if (!tokenStr) return next('/login');
  next();
})

export default router
