import { TestBed } from '@angular/core/testing';

import { AdminPanelServiceService } from './admin-panel-service.service';

describe('AdminPanelServiceService', () => {
  let service: AdminPanelServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPanelServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
