import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'Home',
    // component: () => import(/* webpackChunkName: "about" */'../views/Home.vue')
    name: 'Admin',

    component: () => import('../views/Admin.vue')
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
    path: '/admin/distribute',
    name: 'Distribute',

    component: () => import('../views/Distribute.vue')
  },
  {
    path: '/organ/',
    name: 'organ',
    component: () => import('../views/Organ.vue')
  },
  {
    path: '/adminLogin',
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
  if (to.path === '/adminLogin' || to.path === '/register') {
    window.sessionStorage.clear();
    return next();
  }
  if (to.path === '/') {
    return next('/admin');
  }
  //获取token
  const tokenStr = window.sessionStorage.getItem('token');
  //无token强制跳转到登录页面
  if (!tokenStr) return next('/adminLogin');
  next();
})

export default router
