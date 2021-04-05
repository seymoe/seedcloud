import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('../layouts/index.vue'),
    children: [
      {
        path: 'dashboard',
        component: () => import('../pages/dashboard.vue')
      },
      // 系统配置相关
      {
        path: 'system/collection',
        component: () => import('../pages/system/collection/index.vue')
      }
    ]
  }
]

export default createRouter({
  routes,
  history: createWebHashHistory()
})