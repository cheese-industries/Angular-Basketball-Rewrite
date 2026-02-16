import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KboComponent } from './kbo.component';

describe('KboComponent', () => {
  let component: KboComponent;
  let fixture: ComponentFixture<KboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KboComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
