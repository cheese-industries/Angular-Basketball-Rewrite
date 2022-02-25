import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NorthAmericaComponent } from './north-america.component';

describe('NorthAmericaComponent', () => {
  let component: NorthAmericaComponent;
  let fixture: ComponentFixture<NorthAmericaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NorthAmericaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NorthAmericaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
