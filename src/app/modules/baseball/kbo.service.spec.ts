import { TestBed } from '@angular/core/testing';

import { KboService } from './kbo.service';

describe('KboService', () => {
  let service: KboService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KboService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
