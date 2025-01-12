import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Boosters from '../views/Boosters.vue';
import Referrals from '../views/Referrals.vue';
import Tasks from '../views/Tasks.vue';
import Awards from '../views/Awards.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home },
  { path: '/boosters', name: 'Boosters', component: Boosters },
  { path: '/referrals', name: 'Referrals', component: Referrals },
  { path: '/tasks', name: 'Tasks', component: Tasks },
  { path: '/awards', name: 'Awards', component: Awards },
];

const router = createRouter({
  history: createWebHistory(), 
  routes, 
});

export default router;
