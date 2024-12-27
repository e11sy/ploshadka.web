import type { RouteRecordRaw } from 'vue-router';
import { Home, Events, Courts, CreateEvent } from '@/presentation/pages';

const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'create-event',
    path: '/create-event',
    component: CreateEvent,
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
