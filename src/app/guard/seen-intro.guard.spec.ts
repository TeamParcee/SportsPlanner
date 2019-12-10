import { TestBed, async, inject } from '@angular/core/testing';

import { SeenIntroGuard } from './seen-intro.guard';

describe('SeenIntroGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeenIntroGuard]
    });
  });

  it('should ...', inject([SeenIntroGuard], (guard: SeenIntroGuard) => {
    expect(guard).toBeTruthy();
  }));
});
