import { Component, OnInit, forwardRef, NgZone, Renderer2, ViewChild, ElementRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import { FieldBase } from '../FieldBase';

@Component({
  selector: 'app-phone-field',
  templateUrl: './phone-field.component.html',
  styleUrls: ['./phone-field.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PhoneFieldComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => PhoneFieldComponent), multi: true }
  ]
})
export class PhoneFieldComponent extends FieldBase {
  // phone number
  public areaCode = '';
  public exchangeCode = '';
  public lineNumber = '';
  // HTMLInputElement
  @ViewChild('areaCodeField') areaCodeField;
  @ViewChild('exchangeCodeField') exchangeCodeField;
  @ViewChild('lineNumberField') lineNumberField;

  @Input()
  public get getNumberWithOutValidation(): boolean {
    return this._getNumberWithOutValidation;
  }
  public set getNumberWithOutValidation(v: boolean) {
    this._getNumberWithOutValidation = JSON.parse(v.toString());
  }

  private _getNumberWithOutValidation: boolean;
  private isFocused = false;
  constructor(renderer2: Renderer2, zone: NgZone, el: ElementRef) {
    super(renderer2, zone, el);
  }
  writeValue(obj: string): void {
    if (obj !== null && obj !== undefined) {
      this.areaCode = obj.substr(0, 3);
      this.exchangeCode = obj.substr(3, 3);
      this.lineNumber = obj.substr(6, 4);
    } else {
      this.areaCode = '';
      this.exchangeCode = '';
      this.lineNumber = '';
    }
  }
  areaCodeChange(event) {
    this.preValidation(event);
    this.areaCode = event.target.value.substr(0, 3);
    if (event.target.value.length > 3) {
      this.exchangeCode = event.target.value.substr(3, 3);
      this.lineNumber = event.target.value.substr(6, 4);
    }
    if (this.areaCode.toString().length === 3) {
      this.exchangeCodeField.nativeElement.focus();
    }
    this.setData();
  }
  exchangeCodeChange(event) {
    if (event.code === 'Backspace' && this.exchangeCode.length === 0) {
      this.areaCodeField.nativeElement.focus();
      return;
    }
    this.preValidation(event);
    this.exchangeCode = event.target.value;
    if (this.exchangeCode.toString().length === 3) {
      this.lineNumberField.nativeElement.focus();
    }
    this.setData();
  }
  lineNumberChange(event) {
    if (event.code === 'Backspace' && this.lineNumber.length === 0) {
      this.exchangeCodeField.nativeElement.focus();
      return;
    }
    this.preValidation(event);
    this.lineNumber = event.target.value;
    this.setData();
  }
  setData() {
    if (this.getNumberWithOutValidation === true) {
      this.value = this.areaCode + this.exchangeCode + this.lineNumber;
      this.propagateChange(this.value);
      return;
    }
    if (this.areaCode.length === 3 && this.exchangeCode.length === 3 && this.lineNumber.length === 4) {
      this.value = this.areaCode + this.exchangeCode + this.lineNumber;
      this.propagateChange(this.value);
      this.reValidate();
      return;
    }
    setTimeout(() => {
      if (this.isFocused === false) {
        this.propagateChange(null);

      }
      this.reValidate();
    });

  }
  focus() {
    this.isFocused = true;
  }
  blur() {
    this.isFocused = false;
    setTimeout(() => {
      if (this.isFocused === false) {
        this.setData();
      }
    });
  }
  preValidation(event) {
    event.target.value = event.target.value.replace(/[^0-9\.]/g, '');
  }
  setDisabledState?(isDisabled: boolean): void {
    this.renderer2.setProperty(this.areaCodeField.nativeElement, 'disabled', isDisabled);
    this.renderer2.setProperty(this.exchangeCodeField.nativeElement, 'disabled', isDisabled);
    this.renderer2.setProperty(this.lineNumberField.nativeElement, 'disabled', isDisabled);
    this.disabled = isDisabled;
    this.reValidate();
  }
  validate(c: FormControl): { [key: string]: any; } {
    this.formControl = c;
    this.error = '';
    if (this.getNumberWithOutValidation === true) {
      return;
    }
    if ((c.dirty || c.touched) && this.isFocused === false) {
      if (this.areaCode === '' && this.exchangeCode === '' && this.lineNumber === '') {
        return;
      } else if (this.areaCode.length < 3 || this.exchangeCode.length < 3 || this.lineNumber.length < 4) {
        this.error = 'Phone number is invalid.';
        return { validatePhone: false };
      }
    }
    return null;
  }
}
