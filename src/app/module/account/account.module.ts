import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ACCOUNT_COMPONENTS, ACCOUNT_ROUTES } from './account.routes';
import { ComponentModule } from '@component/component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ...ACCOUNT_COMPONENTS
  ],
  imports: [
    ComponentModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ACCOUNT_ROUTES),
  ]
})
export class AccountModule { }
