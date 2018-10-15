import { TestBed } from '@angular/core/testing';

import { CkeditorConfigService } from './ckeditor-config.service';

describe('CkeditorConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CkeditorConfigService = TestBed.get(CkeditorConfigService);
    expect(service).toBeTruthy();
  });
});
