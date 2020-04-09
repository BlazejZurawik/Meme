import { TestBed } from '@angular/core/testing';

import { ShellAdminService } from './shell-admin.service';

describe('ShellAdminService', () => {
  let service: ShellAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShellAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
