import type { RouteRecordRaw } from 'vue-router';
import { Home, Events, Courts } from '@/presentation/pages';

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
  },
  {
    name: 'courts',
    path: '/courts',
    component: Courts,
  }
]

export default routes;
