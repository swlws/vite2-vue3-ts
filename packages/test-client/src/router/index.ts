import { createRouter, createWebHashHistory } from 'vue-router';
import { menuRouters, singlePageRouters } from './routes';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/frame/main/index.vue'),
      children: menuRouters(),
      redirect: '/welcome',
    },
    {
      path: '/child',
      component: () => import('../views/frame/child/index.vue'),
      children: singlePageRouters(),
    },
  ],
});

export default router;
