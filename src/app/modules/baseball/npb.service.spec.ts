import { TestBed } from '@angular/core/testing';

import { NpbService } from './npb.service';

describe('NpbService', () => {
  let service: NpbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NpbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
