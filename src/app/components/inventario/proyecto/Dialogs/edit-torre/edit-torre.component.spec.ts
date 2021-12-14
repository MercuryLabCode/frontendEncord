import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTorreComponent } from './edit-torre.component';

describe('EditTorreComponent', () => {
  let component: EditTorreComponent;
  let fixture: ComponentFixture<EditTorreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTorreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTorreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
