import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsPlannerTemplatesPage } from './sports-planner-templates.page';

describe('SportsPlannerTemplatesPage', () => {
  let component: SportsPlannerTemplatesPage;
  let fixture: ComponentFixture<SportsPlannerTemplatesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportsPlannerTemplatesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsPlannerTemplatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
