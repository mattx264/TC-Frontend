import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthDayFieldComponent } from './month-day-field.component';

describe('MonthDayFieldComponent', () => {
  let component: MonthDayFieldComponent;
  let fixture: ComponentFixture<MonthDayFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthDayFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthDayFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
