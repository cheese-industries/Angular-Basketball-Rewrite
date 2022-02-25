import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D23Component } from './d23.component';

describe('D23Component', () => {
  let component: D23Component;
  let fixture: ComponentFixture<D23Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ D23Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(D23Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
