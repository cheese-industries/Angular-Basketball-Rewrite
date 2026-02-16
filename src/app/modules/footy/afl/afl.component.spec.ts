import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AflComponent } from './afl.component';

describe('AflComponent', () => {
  let component: AflComponent;
  let fixture: ComponentFixture<AflComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AflComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AflComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
