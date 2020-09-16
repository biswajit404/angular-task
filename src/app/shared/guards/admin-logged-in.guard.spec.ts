import { TestBed, async, inject } from '@angular/core/testing';

import { AdminLoggedInGuard } from './admin-logged-in.guard';

describe('AdminLoggedInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminLoggedInGuard]
    });
  });

  it('should ...', inject([AdminLoggedInGuard], (guard: AdminLoggedInGuard) => {
    expect(guard).toBeTruthy();
  }));
});
