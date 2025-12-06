import { LoginComponent } from './login/login.component';

import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { SuccessPasswordComponent } from './success-password/success-password.component';
import { SubscriptionComponent } from './subscription/subscription.component';

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent
    },
    {
        path: 'new-password',
        component: NewPasswordComponent
    },
    {
        path: 'success-password',
        component: SuccessPasswordComponent
    },
    {
        path: 'subscription',
        component: SubscriptionComponent
    }
];

export const AUTH_COMPONENTS = [
    LoginComponent,
    RegisterComponent,
    RecoverPasswordComponent,
    NewPasswordComponent,
    SuccessPasswordComponent,
    SubscriptionComponent
];
