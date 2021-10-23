import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosComercioComponent } from './productos-comercio.component';

describe('ProductosComercioComponent', () => {
  let component: ProductosComercioComponent;
  let fixture: ComponentFixture<ProductosComercioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosComercioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosComercioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
