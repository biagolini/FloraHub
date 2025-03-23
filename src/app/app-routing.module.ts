import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { AboutComponent } from './shared/components/about/about.component';
import { QrcodesComponent } from './shared/components/qrcodes/qrcodes.component';

const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      {
        path: 'sobre',
        component: AboutComponent,
      },
      {
        path: 'qrcodes',
        component: QrcodesComponent,
      },
      {
        path: '',
        loadChildren: () =>
          import('./catalog/catalog.module').then((m) => m.CatalogModule),
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
