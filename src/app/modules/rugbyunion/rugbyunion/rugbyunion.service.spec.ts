import { TestBed } from '@angular/core/testing';

import { RugbyunionService } from './rugbyunion.service';

describe('RugbyunionService', () => {
  let service: RugbyunionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RugbyunionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
