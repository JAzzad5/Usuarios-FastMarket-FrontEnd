import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorComerciosComponent } from './contenedor-comercios.component';

describe('ContenedorComerciosComponent', () => {
  let component: ContenedorComerciosComponent;
  let fixture: ComponentFixture<ContenedorComerciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorComerciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorComerciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
