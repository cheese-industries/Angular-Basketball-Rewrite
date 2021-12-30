import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GLeagueComponent } from './g-league.component';

describe('GLeagueComponent', () => {
  let component: GLeagueComponent;
  let fixture: ComponentFixture<GLeagueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GLeagueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
