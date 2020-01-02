import { Component, OnInit, forwardRef, NgZone, Renderer2, ElementRef } from '@angular/core';
import { FieldBase } from '../FieldBase';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';


@Component({
  selector: 'app-calendar-field',
  templateUrl: './calendar-field.component.html',
  styleUrls: ['./calendar-field.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CalendarFieldComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => CalendarFieldComponent), multi: true }
  ]
})
export class CalendarFieldComponent extends FieldBase {
  constructor(renderer2: Renderer2, zone: NgZone, el: ElementRef) {
    super(renderer2, zone, el);

  }
  onValueChange(event) {
    this.propagateChange(this.value);
  }
  writeValue(obj: any): void {
    this.value = obj;
  }
  calendarError($event) {
    if (this.disabled !== true && (this.formControl.dirty || this.formControl.touched)) {
      if ($event.validateDay === false) {
        this.error = 'Day is invalid.';
      }
      if ($event.validateMonth === false) {
        this.error = 'Month is invalid.';
      }
      if ($event.validateYear === false) {
        this.error = 'Year is invalid.';
      }
    }
  }
  setDisabledState?(isDisabled: boolean): void {
   
    this.disabled = isDisabled;
    this.reValidate();
  }
  validate(c: FormControl) {
    this.formControl = c;
    this.error = '';
    if (this.disabled !== true && (c.dirty || c.touched)) {
      if (c.value === '' || c.value === null || c.value === undefined) {
        this.error = this.label + ' is required.';
      }
    }
    return null;
  }
}
