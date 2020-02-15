import { TestBed } from '@angular/core/testing';

import { SeleniumConverterService } from './selenium-converter.service';

describe('SeleniumConverterService', () => {
  let service: SeleniumConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeleniumConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
