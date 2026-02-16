import { TestBed } from '@angular/core/testing';

import { CpblService } from './cpbl.service';

describe('CpblService', () => {
  let service: CpblService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpblService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
