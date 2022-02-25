import { TestBed } from '@angular/core/testing';

import { ChampionsTourService } from './champions-tour.service';

describe('ChampionsTourService', () => {
  let service: ChampionsTourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChampionsTourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
