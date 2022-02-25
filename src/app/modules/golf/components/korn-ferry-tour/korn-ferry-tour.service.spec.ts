import { TestBed } from '@angular/core/testing';

import { KornFerryTourService } from './korn-ferry-tour.service';

describe('KornFerryTourService', () => {
  let service: KornFerryTourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KornFerryTourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
