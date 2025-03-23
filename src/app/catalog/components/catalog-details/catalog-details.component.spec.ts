import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogDetailsComponent } from './catalog-details.component';

describe('CatalogDetailsComponent', () => {
  let component: CatalogDetailsComponent;
  let fixture: ComponentFixture<CatalogDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogDetailsComponent]
    });
    fixture = TestBed.createComponent(CatalogDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
