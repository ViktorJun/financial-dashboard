import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'table',
    pathMatch: 'full',
  },
  {
    path: 'table',
    loadComponent: () =>
      import('./features/dashboard/pages/general-table-page/general-table-page.component')
        .then((m) => m.GeneralTablePageComponent),
  },
  {
    path: 'short-info',
    loadComponent: () =>
      import('./features/dashboard/pages/short-info-page/short-info-page.component')
        .then((m) => m.ShortInfoPageComponent),
  },
  {
    path: '**',
    redirectTo: 'table',
  },
];
