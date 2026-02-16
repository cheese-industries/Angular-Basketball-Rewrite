import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpblComponent } from './cpbl.component';

describe('CpblComponent', () => {
  let component: CpblComponent;
  let fixture: ComponentFixture<CpblComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpblComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
