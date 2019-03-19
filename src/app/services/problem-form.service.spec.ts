import { TestBed } from '@angular/core/testing';

import { ProblemFormService } from './problem-form.service';

describe('ProblemFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProblemFormService = TestBed.get(ProblemFormService);
    expect(service).toBeTruthy();
  });
});
