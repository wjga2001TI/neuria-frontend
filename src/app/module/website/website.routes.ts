import { Routes } from '@angular/router';
import { AuthGuard } from './../../core/guard/auth.guard';
import { AuthRedirectGuard } from './../../core/guard/auth-redirect.guard';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

export const WEBSITE_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
          path: 'account',
          loadChildren: () => import('./../../module/account/account.module').then(m => m.AccountModule),
          data: {},
          canActivate: [AuthGuard]
      },
      {
          path: 'calendar',
          loadChildren: () => import('./../../module/calendar/calendar.module').then(m => m.CalendarModule),
          data: {},
          canActivate: [AuthGuard]
      },
      {
          path: 'user',
          loadChildren: () => import('./../../module/user/user.module').then(m => m.UserModule),
          data: {},
          canActivate: [AuthGuard]
      },
      {
          path: 'dashboard',
          loadChildren: () => import('./../../module/dashboard/dashboard.module').then(m => m.DashboardModule),
          data: {},
          canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./../../module/auth/auth.module').then(m => m.AuthModule),
    canActivate: [AuthRedirectGuard]
  },
  { path: '**', redirectTo: '' }
];

export const WEBSITE_COMPONENTS = [
  AuthLayoutComponent,
  MainLayoutComponent
];
