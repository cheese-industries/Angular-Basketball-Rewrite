import { TestBed } from '@angular/core/testing';

import { AflService } from './afl.service';

describe('AflService', () => {
  let service: AflService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AflService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
