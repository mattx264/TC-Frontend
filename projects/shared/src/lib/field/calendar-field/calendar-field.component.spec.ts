import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarFieldComponent } from './calendar-field.component';

describe('CalendarFieldComponent', () => {
  let component: CalendarFieldComponent;
  let fixture: ComponentFixture<CalendarFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
