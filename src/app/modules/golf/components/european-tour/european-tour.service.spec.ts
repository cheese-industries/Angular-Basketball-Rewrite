import { TestBed } from '@angular/core/testing';

import { EuropeanTourService } from './european-tour.service';

describe('EuropeanTourService', () => {
  let service: EuropeanTourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EuropeanTourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
