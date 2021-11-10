import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialOrdenesComponent } from './historial-ordenes.component';

describe('HistorialOrdenesComponent', () => {
  let component: HistorialOrdenesComponent;
  let fixture: ComponentFixture<HistorialOrdenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialOrdenesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialOrdenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
