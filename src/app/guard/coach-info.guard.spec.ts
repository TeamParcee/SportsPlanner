import { TestBed, async, inject } from '@angular/core/testing';

import { CoachInfoGuard } from './coach-info.guard';

describe('CoachInfoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoachInfoGuard]
    });
  });

  it('should ...', inject([CoachInfoGuard], (guard: CoachInfoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
