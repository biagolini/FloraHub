import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CatalogPanelComponent } from './components/catalog-panel/catalog-panel.component';
import { CatalogDetailsComponent } from './components/catalog-details/catalog-details.component';

@NgModule({
  declarations: [CatalogPanelComponent, CatalogDetailsComponent],
  imports: [CommonModule, CatalogRoutingModule, SharedModule],
})
export class CatalogModule {}
