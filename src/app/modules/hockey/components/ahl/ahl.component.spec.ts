import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhlComponent } from './ahl.component';

describe('AhlComponent', () => {
  let component: AhlComponent;
  let fixture: ComponentFixture<AhlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AhlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AhlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
