import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDrillPage } from './add-drill.page';

describe('AddDrillPage', () => {
  let component: AddDrillPage;
  let fixture: ComponentFixture<AddDrillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDrillPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDrillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
