import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDrillPage } from './view-drill.page';

describe('ViewDrillPage', () => {
  let component: ViewDrillPage;
  let fixture: ComponentFixture<ViewDrillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDrillPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDrillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
