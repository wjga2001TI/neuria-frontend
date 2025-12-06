import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UsersSubscriptionComponent } from './users-subscription/users-subscription.component';

export const USER_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
    },
    {
        path: 'list',
        component: UserListComponent
    },
    {
        path: ':id/subscription',
        component: UsersSubscriptionComponent
    },
];

export const USER_COMPONENTS = [
  UserListComponent,
  UsersSubscriptionComponent
];
