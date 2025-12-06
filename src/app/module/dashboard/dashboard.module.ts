import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from '@component/component.module';
import { DASHBOARD_COMPONENTS, DASHBOARD_ROUTES } from './dashboard.routes';

@NgModule({
  declarations: [...DASHBOARD_COMPONENTS],
  imports: [
    ComponentModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(DASHBOARD_ROUTES),
  ]
})
export class DashboardModule { }
