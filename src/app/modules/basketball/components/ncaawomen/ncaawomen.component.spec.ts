import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcaawomenComponent } from './ncaawomen.component';

describe('NcaawomenComponent', () => {
  let component: NcaawomenComponent;
  let fixture: ComponentFixture<NcaawomenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcaawomenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NcaawomenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
