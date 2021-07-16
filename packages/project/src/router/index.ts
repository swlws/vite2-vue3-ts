import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/welcome/index.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    console.log('scrollBehavior');
    console.log(`to: ${to}`);
    console.log(`from: ${from}`);
    console.log(`savedPosition: ${savedPosition}`);
  },
});

export default router;
