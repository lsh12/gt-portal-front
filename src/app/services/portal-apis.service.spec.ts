import { TestBed } from '@angular/core/testing';

import { PortalApisService } from './portal-apis.service';

describe('PortalApisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PortalApisService = TestBed.get(PortalApisService);
    expect(service).toBeTruthy();
  });
});
