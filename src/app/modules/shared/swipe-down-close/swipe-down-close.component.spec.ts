import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwipeDownCloseComponent } from './swipe-down-close.component';

describe('SwipeDownCloseComponent', () => {
  let component: SwipeDownCloseComponent;
  let fixture: ComponentFixture<SwipeDownCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwipeDownCloseComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwipeDownCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
