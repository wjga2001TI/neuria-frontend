import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from '@component/component.module';
import { USER_COMPONENTS, USER_ROUTES } from './user.routes';

@NgModule({
  declarations: [...USER_COMPONENTS],
  imports: [
    ComponentModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(USER_ROUTES),
  ]
})
export class UserModule { }
