import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrillsPage } from './drills.page';

describe('DrillsPage', () => {
  let component: DrillsPage;
  let fixture: ComponentFixture<DrillsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrillsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrillsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
