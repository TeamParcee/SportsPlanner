import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCoachPage } from './select-coach.page';

describe('SelectCoachPage', () => {
  let component: SelectCoachPage;
  let fixture: ComponentFixture<SelectCoachPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCoachPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCoachPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
