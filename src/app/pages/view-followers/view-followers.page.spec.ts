import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFollowersPage } from './view-followers.page';

describe('ViewFollowersPage', () => {
  let component: ViewFollowersPage;
  let fixture: ComponentFixture<ViewFollowersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFollowersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFollowersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
