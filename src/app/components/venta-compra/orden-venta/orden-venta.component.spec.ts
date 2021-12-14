import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenVentaComponent } from './orden-venta.component';

describe('OrdenVentaComponent', () => {
  let component: OrdenVentaComponent;
  let fixture: ComponentFixture<OrdenVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
