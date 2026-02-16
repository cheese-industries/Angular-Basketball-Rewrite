import { TestBed } from '@angular/core/testing';

import { NrlService } from './nrl.service';

describe('NrlService', () => {
  let service: NrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
