import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KornFerryTourComponent } from './korn-ferry-tour.component';

describe('KornFerryTourComponent', () => {
  let component: KornFerryTourComponent;
  let fixture: ComponentFixture<KornFerryTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KornFerryTourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KornFerryTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
