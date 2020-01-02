import { HelperService } from '../../../services/helper.service';
import { FieldBase } from '../FieldBase';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, NgZone, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { CheckboxComponent } from '../../checkbox/checkbox.component';

@Component({
  selector: 'app-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CheckboxFieldComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => CheckboxFieldComponent), multi: true }
  ]
})
export class CheckboxFieldComponent extends FieldBase {

  @ViewChild('checkbox') checkbox: CheckboxComponent;
  colSize: string;
  constructor(public renderer2: Renderer2, zone: NgZone, private helperService: HelperService, el: ElementRef) {
    super(renderer2, zone, el);
  }
  setDisabledState?(isDisabled: boolean): void {
    super.setDisabledState(isDisabled);
    this.checkbox.setDisabledState(true);
  }
  clicked() {
    if (this.disabled !== true) {
      this.propagateChange(this.value);
    }
  }
  labelClicked() {
    if (this.disabled !== true) {
      this.value = !this.helperService.forceBoolean(this.value);
      this.propagateChange(this.value);
    }
  }
}
