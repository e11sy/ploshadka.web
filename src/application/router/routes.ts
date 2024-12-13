import type { RouteRecordRaw } from 'vue-router';
import { Home, Events } from '@/presentation/pages';

const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'events',
    path: '/events',
    component: Events,
  }
]

export default routes;
