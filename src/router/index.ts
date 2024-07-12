import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BookForm from '../views/BookForm.vue';
import LibraryList from '../views/LibraryList.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/book/:id?',
    name: 'BookForm',
    component: BookForm
  },
  {
    path: '/library',
    name: 'LibraryList',
    component: LibraryList,
},
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;