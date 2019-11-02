import { TestBed, async, inject } from '@angular/core/testing';

import { ConfirmEmailGuard } from '../guard/confirm-email.guard';

describe('ConfirmEmailGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmEmailGuard]
    });
  });

  it('should ...', inject([ConfirmEmailGuard], (guard: ConfirmEmailGuard) => {
    expect(guard).toBeTruthy();
  }));
});
