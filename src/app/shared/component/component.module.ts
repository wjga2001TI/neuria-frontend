import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterLink } from "@angular/router";

@NgModule({
  declarations: [LoaderComponent, SidebarComponent],
  imports: [
    CommonModule,
    RouterLink
],
  exports: [LoaderComponent, SidebarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentModule { }
