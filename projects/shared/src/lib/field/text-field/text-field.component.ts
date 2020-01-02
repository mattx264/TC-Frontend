import { Component, Input, forwardRef, Renderer2, NgZone, ElementRef } from '@angular/core';
import {
  FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS
} from '@angular/forms';

import { FieldBase } from '../FieldBase';
@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextFieldComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => TextFieldComponent), multi: true }
  ]
})
export class TextFieldComponent extends FieldBase {
  colSize: string;

  @Input() maxLength: number;
  @Input() minLength: number;
  @Input() regExpPatern: string = null;
  formControlText = new FormControl();

  constructor(public renderer2: Renderer2, zone: NgZone, el: ElementRef) {
    super(renderer2, zone, el);
    this.colSize = 'col-sm-7';
    this.formControlText.valueChanges
      .subscribe(val => {
        this.value = val;
        this.propagateChange(val);
      });
  }
  writeValue(obj: any): void {

    this.value = obj;
    this.formControlText.setValue(this.value, { emitEvent: false });
  }
  validate(c: FormControl) {
    super.validate(c);
    if (this.value === null || this.value === undefined) {
      return;
    }
    if (this.error === '' && this.minLength > 0 && this.value.length < this.minLength) {
      this.error = 'Minimum length is ' + this.minLength;
    }
    if (this.error === '' && this.regExpPatern !== null) {
      const patern = new RegExp(this.regExpPatern);
      if (patern.test(this.value) === false) {
        this.error = 'Numeric only';
      }
    }
  }
}
