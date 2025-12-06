import { Routes } from '@angular/router';

export const routes: Routes = [
  {
      path: '',
      loadChildren: () => import('./module/website/website.module').then(m => m.WebsiteModule),
  }
];
