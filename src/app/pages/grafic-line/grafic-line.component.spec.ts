import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficLineComponent } from './grafic-line.component';

describe('GraficLineComponent', () => {
  let component: GraficLineComponent;
  let fixture: ComponentFixture<GraficLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
