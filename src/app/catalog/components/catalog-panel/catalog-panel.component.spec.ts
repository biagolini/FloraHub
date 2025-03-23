import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogPanelComponent } from './catalog-panel.component';

describe('CatalogPanelComponent', () => {
  let component: CatalogPanelComponent;
  let fixture: ComponentFixture<CatalogPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogPanelComponent]
    });
    fixture = TestBed.createComponent(CatalogPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
