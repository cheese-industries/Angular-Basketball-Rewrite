import { TestBed } from '@angular/core/testing';

import { LpgaService } from './lpga.service';

describe('LpgaService', () => {
  let service: LpgaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LpgaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
