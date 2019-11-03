import { TestBed, async, inject } from '@angular/core/testing';

import { SelectCoachGuard } from './select-coach.guard';

describe('SelectCoachGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectCoachGuard]
    });
  });

  it('should ...', inject([SelectCoachGuard], (guard: SelectCoachGuard) => {
    expect(guard).toBeTruthy();
  }));
});
