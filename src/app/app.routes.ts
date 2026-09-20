import { Routes } from '@angular/router';
import { Auth } from './pages/auth/auth';
import { Layout } from './layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    //loadComponent: () => import('./layout/layout').then((c) => c.Layout), // lazy loading - при первом заходе на страницу
  },
  {
    path: 'auth',
    //component: Auth, // eager loading - моментально все файлы сразу
    loadComponent: () => import('./pages/auth/auth').then((c) => c.Auth), // lazy loading - при первом заходе на страницу
  },
];
