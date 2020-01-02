import { TestBed } from '@angular/core/testing';

import { GuidGeneratorService } from './guid-generator.service';

describe('GuidGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuidGeneratorService = TestBed.get(GuidGeneratorService);
    expect(service).toBeTruthy();
  });
});
