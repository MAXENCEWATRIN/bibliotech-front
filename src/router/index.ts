import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BookForm from '../views/BookForm.vue';
import LibraryForm from '../views/LibraryForm.vue';
import EditorForm from '../views/EditorForm.vue';
import OwnerForm from '../views/OwnerForm.vue';

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
    path: '/library/:id?',
    name: 'LibraryForm',
    component: LibraryForm
  },
  {
    path: '/owner/:id?',
    name: 'OwnerForm',
    component: OwnerForm
  },
  {
    path: '/editor/:id?',
    name: 'EditorForm',
    component: EditorForm
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;