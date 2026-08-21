import { Routes } from '@angular/router';
import { OktaCallbackComponent, canActivateAuthGuard } from '@okta/okta-angular';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  {
    path: 'login/callback',
    component: OktaCallbackComponent,
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),
    canActivate: [],
  },
];
