import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RugbyunionComponent } from './rugbyunion.component';

describe('RugbyunionComponent', () => {
  let component: RugbyunionComponent;
  let fixture: ComponentFixture<RugbyunionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RugbyunionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RugbyunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
