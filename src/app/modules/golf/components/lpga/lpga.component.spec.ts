import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LpgaComponent } from './lpga.component';

describe('LpgaComponent', () => {
  let component: LpgaComponent;
  let fixture: ComponentFixture<LpgaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LpgaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LpgaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
