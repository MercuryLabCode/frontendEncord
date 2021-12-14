import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOportunidadComponent } from './add-oportunidad.component';

describe('AddOportunidadComponent', () => {
  let component: AddOportunidadComponent;
  let fixture: ComponentFixture<AddOportunidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOportunidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOportunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
