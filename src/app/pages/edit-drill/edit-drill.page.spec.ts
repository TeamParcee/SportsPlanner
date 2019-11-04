import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDrillPage } from './edit-drill.page';

describe('EditDrillPage', () => {
  let component: EditDrillPage;
  let fixture: ComponentFixture<EditDrillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDrillPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDrillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
