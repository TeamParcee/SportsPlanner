import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToPlanPage } from './add-to-plan.page';

describe('AddToPlanPage', () => {
  let component: AddToPlanPage;
  let fixture: ComponentFixture<AddToPlanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToPlanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
