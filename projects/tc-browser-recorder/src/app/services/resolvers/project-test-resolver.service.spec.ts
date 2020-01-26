import { TestBed } from '@angular/core/testing';

import { ProjectTestResolverService } from './project-test-resolver.service';

describe('ProjectTestResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProjectTestResolverService = TestBed.get(ProjectTestResolverService);
    expect(service).toBeTruthy();
  });
});
