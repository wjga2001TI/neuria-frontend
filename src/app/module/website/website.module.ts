import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WEBSITE_COMPONENTS, WEBSITE_ROUTES } from './website.routes';
import { RouterModule } from '@angular/router';
import { ComponentModule } from '@component/component.module';


@NgModule({
  declarations: [...WEBSITE_COMPONENTS],
  imports: [
    CommonModule,
    RouterModule.forChild(WEBSITE_ROUTES),
    ComponentModule
  ]
})
export class WebsiteModule { }
