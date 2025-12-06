import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SocialFormComponent } from './social-form/social-form.component';
import { PublishFormComponent } from './publish-form/publish-form.component';

export const DASHBOARD_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: ''
    },
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'form/:social',
        component: SocialFormComponent
    },
    {
        path: 'publish/:social',
        component: PublishFormComponent
    },
];

export const DASHBOARD_COMPONENTS = [
  DashboardComponent,
  SocialFormComponent,
  PublishFormComponent
];
