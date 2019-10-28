import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActivityPage } from './view-activity.page';

describe('ViewActivityPage', () => {
  let component: ViewActivityPage;
  let fixture: ComponentFixture<ViewActivityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewActivityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewActivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
