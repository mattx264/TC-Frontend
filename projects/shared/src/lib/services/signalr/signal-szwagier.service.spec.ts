import { TestBed } from '@angular/core/testing';

import { SignalSzwagierService } from './signal-szwagier.service';

describe('SignalSzwagierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SignalSzwagierService = TestBed.get(SignalSzwagierService);
    expect(service).toBeTruthy();
  });
});
