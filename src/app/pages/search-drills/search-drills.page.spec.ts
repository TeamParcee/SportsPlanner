import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDrillsPage } from './search-drills.page';

describe('SearchDrillsPage', () => {
  let component: SearchDrillsPage;
  let fixture: ComponentFixture<SearchDrillsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDrillsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDrillsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
