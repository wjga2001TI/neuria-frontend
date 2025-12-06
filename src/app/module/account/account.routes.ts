import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { NotificationComponent } from './notification/notification.component';

export const ACCOUNT_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile'
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'notification',
        component: NotificationComponent
    },
];

export const ACCOUNT_COMPONENTS = [
  ProfileComponent,
  NotificationComponent
];
