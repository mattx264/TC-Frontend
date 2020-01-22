import { TestBed } from '@angular/core/testing';

import { ProjectConfigService } from './project-config.service';

describe('ProjectConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      
  }));

  it('should be created', () => {
    const service: ProjectConfigService = TestBed.get(ProjectConfigService);
    expect(service).toBeTruthy();
  });
});
