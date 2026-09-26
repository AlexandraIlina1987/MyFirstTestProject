import { Routes } from '@angular/router';
import { Auth } from './pages/auth/auth';
import { Layout } from './layout/layout';
import { Tours } from '././pages/tours/tours';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    //loadComponent: () => import('./layout/layout').then((c) => c.Layout), // lazy loading - при первом заходе на страницу
    children: [
      {
        path: '', //child route path
        component: Tours, // child route component that the router renders
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings').then((c) => c.Settings),
      },
      {
        path: 'tour/:id',
        loadComponent: () => import('./pages/tour-item/tour-item').then((c) => c.TourItem),
      },
    ],
  },

  {
    path: 'auth',
    //component: Auth, // eager loading - моментально все файлы сразу
    loadComponent: () => import('./pages/auth/auth').then((c) => c.Auth), // lazy loading - при первом заходе на страницу
  },
  {
    path: '**',
    component: Tours,
  },
];
