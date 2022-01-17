import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcaahComponent } from './ncaah.component';

describe('NcaahComponent', () => {
  let component: NcaahComponent;
  let fixture: ComponentFixture<NcaahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcaahComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NcaahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
