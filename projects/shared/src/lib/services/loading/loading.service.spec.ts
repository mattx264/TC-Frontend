import { LoadingService } from './loading.service';
import { TestBed, inject } from '@angular/core/testing';


describe('LoadingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService]
    });
  });

  it('should be created', inject([LoadingService], (service: LoadingService) => {
    expect(service).toBeTruthy();
  }));
});
