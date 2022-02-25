import { TestBed } from '@angular/core/testing';

import { D23Service } from './d23.service';

describe('D23Service', () => {
  let service: D23Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(D23Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
