import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CflComponent } from './cfl.component';

describe('CflComponent', () => {
  let component: CflComponent;
  let fixture: ComponentFixture<CflComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CflComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CflComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
