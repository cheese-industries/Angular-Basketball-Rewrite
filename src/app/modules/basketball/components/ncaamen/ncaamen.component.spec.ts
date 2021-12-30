import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcaamenComponent } from './ncaamen.component';

describe('NcaamenComponent', () => {
  let component: NcaamenComponent;
  let fixture: ComponentFixture<NcaamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcaamenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NcaamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
