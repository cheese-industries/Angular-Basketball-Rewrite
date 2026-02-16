import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NorthAmericaStandingsComponent } from './north-america-standings.component';

describe('NorthAmericaStandingsComponent', () => {
  let component: NorthAmericaStandingsComponent;
  let fixture: ComponentFixture<NorthAmericaStandingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NorthAmericaStandingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NorthAmericaStandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
