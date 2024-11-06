import type { RouteRecordRaw } from 'vue-router';
import { Home } from '@/presentation/pages'


const routes: RouteRecordRaw[] = [
    {
        name: 'home',
        path: '/',
        component: Home,
    },
]

export default routes;