import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchlComponent } from './echl.component';

describe('EchlComponent', () => {
  let component: EchlComponent;
  let fixture: ComponentFixture<EchlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EchlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EchlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
