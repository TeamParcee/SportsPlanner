import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAdminTemplatePage } from './new-admin-template.page';

describe('NewAdminTemplatePage', () => {
  let component: NewAdminTemplatePage;
  let fixture: ComponentFixture<NewAdminTemplatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAdminTemplatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAdminTemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
