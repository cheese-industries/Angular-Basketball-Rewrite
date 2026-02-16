import { TestBed } from '@angular/core/testing';

import { NcaaBaseballService } from './ncaa-baseball.service';

describe('NcaaBaseballService', () => {
  let service: NcaaBaseballService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NcaaBaseballService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
