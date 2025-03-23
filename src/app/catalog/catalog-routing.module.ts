import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogPanelComponent } from './components/catalog-panel/catalog-panel.component';
import { CatalogDetailsComponent } from './components/catalog-details/catalog-details.component';

const routes: Routes = [
  { path: '', component: CatalogPanelComponent },
  { path: ':plantaKey', component: CatalogDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogRoutingModule {}
