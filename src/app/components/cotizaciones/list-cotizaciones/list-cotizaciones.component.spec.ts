import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCotizacionesComponent } from './list-cotizaciones.component';

describe('ListCotizacionesComponent', () => {
  let component: ListCotizacionesComponent;
  let fixture: ComponentFixture<ListCotizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCotizacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCotizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
