import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMateriaComponent } from './list-materia.component';

describe('ListMateriaComponent', () => {
  let component: ListMateriaComponent;
  let fixture: ComponentFixture<ListMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMateriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
