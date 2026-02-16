import { TestBed } from '@angular/core/testing';

import { WtaService } from './wta.service';

describe('WtaService', () => {
  let service: WtaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WtaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
