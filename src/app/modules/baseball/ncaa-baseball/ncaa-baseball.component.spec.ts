import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NcaaBaseballComponent } from './ncaa-baseball.component';

describe('NcaaBaseballComponent', () => {
  let component: NcaaBaseballComponent;
  let fixture: ComponentFixture<NcaaBaseballComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NcaaBaseballComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NcaaBaseballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
