import { Routes } from '@angular/router';
import { CalendarTableComponent } from './calendar-table/calendar-table.component';
import { PostComponent } from './post/post.component';

export const CALENDAR_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: ''
    },
    {
        path: '',
        component: CalendarTableComponent
    },
    {
        path: 'posts/:date',
        component: PostComponent
    },
];

export const CALENDAR_COMPONENTS = [
  CalendarTableComponent,
  PostComponent
];
