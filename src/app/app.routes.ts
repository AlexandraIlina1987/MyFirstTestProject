import { Routes } from '@angular/router';
import { Auth } from './pages/auth/auth';
import { Layout } from './layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
  },
  {
    path: 'auth',
    component: Auth,
  },
];
