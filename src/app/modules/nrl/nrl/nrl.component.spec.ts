import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NrlComponent } from './nrl.component';

describe('NrlComponent', () => {
  let component: NrlComponent;
  let fixture: ComponentFixture<NrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NrlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
