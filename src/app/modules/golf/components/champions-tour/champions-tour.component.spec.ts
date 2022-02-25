import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionsTourComponent } from './champions-tour.component';

describe('ChampionsTourComponent', () => {
  let component: ChampionsTourComponent;
  let fixture: ComponentFixture<ChampionsTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampionsTourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampionsTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
