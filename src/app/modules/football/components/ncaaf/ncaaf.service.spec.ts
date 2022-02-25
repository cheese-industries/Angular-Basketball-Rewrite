import { TestBed } from '@angular/core/testing';

import { NcaafService } from './ncaaf.service';

describe('NcaafService', () => {
  let service: NcaafService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NcaafService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
