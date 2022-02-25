import { TestBed } from '@angular/core/testing';

import { NorthAmericaService } from './north-america.service';

describe('NorthAmericaService', () => {
  let service: NorthAmericaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NorthAmericaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
