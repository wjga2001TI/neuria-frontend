import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentModule } from '@component/component.module';
import { CALENDAR_COMPONENTS, CALENDAR_ROUTES } from './calendar.routes';
import { DatePipe } from '@angular/common'; // ← Importar DatePipe

@NgModule({
  declarations: [...CALENDAR_COMPONENTS],
  imports: [
    ComponentModule,
    CommonModule,
    RouterModule.forChild(CALENDAR_ROUTES),
  ],
  providers: [DatePipe]
})
export class CalendarModule { }
