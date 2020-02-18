import { TestBed } from '@angular/core/testing';

import { BrowserTabService } from './browser-tab.service';

describe('BrowserTabService', () => {
  let service: BrowserTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
