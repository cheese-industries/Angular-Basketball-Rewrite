import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EuropeanTourComponent } from './european-tour.component';

describe('EuropeanTourComponent', () => {
  let component: EuropeanTourComponent;
  let fixture: ComponentFixture<EuropeanTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EuropeanTourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EuropeanTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
