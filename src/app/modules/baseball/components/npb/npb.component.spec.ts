import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpbComponent } from './npb.component';

describe('NpbComponent', () => {
  let component: NpbComponent;
  let fixture: ComponentFixture<NpbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NpbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NpbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
