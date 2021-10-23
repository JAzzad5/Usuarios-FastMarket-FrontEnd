import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorCategoriasComponent } from './contenedor-categorias.component';

describe('ContenedorCategoriasComponent', () => {
  let component: ContenedorCategoriasComponent;
  let fixture: ComponentFixture<ContenedorCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorCategoriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
