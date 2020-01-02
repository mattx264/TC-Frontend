import { NG_VALUE_ACCESSOR, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { FieldBase } from './../FieldBase';
import { Component, OnInit, forwardRef, Renderer2, NgZone, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-month-day-field',
  templateUrl: './month-day-field.component.html',
  styleUrls: ['./month-day-field.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MonthDayFieldComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => MonthDayFieldComponent), multi: true }
  ]
})
export class MonthDayFieldComponent extends FieldBase {
  @ViewChild('inputDay') inputDay;
  @ViewChild('inputMonth') inputMonth;
  month: string;
  day: string;
  isFocused: boolean;
  isJumpToDayField: boolean;
  constructor(renderer2: Renderer2, zone: NgZone, el: ElementRef) {
    super(renderer2, zone, el);
    this.month = '';
    this.day = '';
    this.isFocused = false;
    this.isJumpToDayField = false;
  }
  writeValue(obj: string): void {
    if (obj !== null && obj !== undefined) {
      this.value = obj;
      this.month = obj.substr(0, 2);
      this.day = obj.substr(2, 2);
    } else {
      this.month = '';
      this.day = '';
    }
  }
  monthChange(event) {
    this.preValidation(event);
    this.month = event.target.value;
    if (this.month.toString().length === 2) {
      this.inputDay.nativeElement.focus();
      this.isFocused = true;
      this.isJumpToDayField = true;
    }
    this.setDate();
  }
  tabPressed() {
    this.isJumpToDayField = true;
  }
  dayChange(event) {
    this.preValidation(event);
    this.day = event.target.value;
    if (this.day.toString().length === 2 && this.isJumpToDayField === false) {
      this.isFocused = true;
    } else {
      this.isJumpToDayField = false;
    }
    this.setDate();
  }
  setDate() {
    if (this.month != null && this.day != null) {
      if (this.month !== '' && this.day !== '') {

        this.value = this.month + this.day;
        this.propagateChange(this.value);
        return;
      }
    }
    setTimeout(() => {
      if (this.isFocused === false) {
        this.propagateChange(null);
      }
    }, 100);
  }
  preValidation(event) {
    event.target.value = event.target.value.replace(/[^0-9\.]/g, '');
  }
  focus() {
    this.isFocused = true;
  }
  blur() {
    this.isFocused = false;
    this.month = this.numberNormalization(this.month);
    this.day = this.numberNormalization(this.day);
    setTimeout(() => {
      if (this.isFocused === false) {
        this.setDate();
      }
    }, 100);
  }
  numberNormalization(number: string): string {
    if (number !== null && number !== '') {
      number = '0' + number;
      return number.slice(-2);
    } else {
      return number;
    }
  }
  setDisabledState?(isDisabled: boolean): void {
    this.renderer2.setProperty(this.inputMonth.nativeElement, 'disabled', isDisabled);
    this.renderer2.setProperty(this.inputDay.nativeElement, 'disabled', isDisabled);
    this.disabled = isDisabled;
    this.reValidate();
  }
  validate(c: AbstractControl): { [key: string]: any; } {
    this.error = '';
    if ((c.dirty || c.touched) && this.isFocused === false) {
      if ((this.day === null || this.day === '') && (this.month === null || this.month === '')) {
        this.error = 'DOB is required.';
      } else if (this.day === null || this.day === '' || +this.day < 1 || +this.day > 31) {
        this.error = 'Day is invalid.';
        return { validateDay: false };
      } else if (this.month === null || this.month === '' || +this.month < 1 || +this.month > 12) {
        this.error = 'Month is invalid.';
        return { validateMonth: false };
      } else if (this.month !== null && +this.month === 2 && +this.day > 29) {
        this.error = 'Day is invalid.';
        return { validateDay: false };
      } else if (c.value === '' || c.value === null || c.value === undefined) {
        this.error = 'DOB is required.';
      }
    }
    return null;
  }
}
