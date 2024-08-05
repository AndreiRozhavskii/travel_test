import { createRouter, createWebHistory } from 'vue-router';
import ApplicationsPage from '../components/ApplicationsPage.vue';
import AddTranslationKeyPage from '../components/AddTranslationKeyPage.vue';

const routes = [
  {
    path: '/',
    name: 'ApplicationsPage',
    component: ApplicationsPage
  },
  {
    path: '/add-translation-key',
    name: 'AddTranslationKeyPage',
    component: AddTranslationKeyPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
