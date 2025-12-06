import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AUTH_ROUTES, AUTH_COMPONENTS } from './auth.routes'
import { ComponentModule } from '@component/component.module';

@NgModule({
  declarations: [
    ...AUTH_COMPONENTS
  ],
  imports: [
    ComponentModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(AUTH_ROUTES),
  ]
})
export class AuthModule { }
