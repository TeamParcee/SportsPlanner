import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlanPage } from './add-plan.page';

describe('AddPlanPage', () => {
  let component: AddPlanPage;
  let fixture: ComponentFixture<AddPlanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPlanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
