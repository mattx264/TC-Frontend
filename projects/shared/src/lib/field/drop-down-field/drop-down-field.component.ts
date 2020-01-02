import { Component, forwardRef, Input, NgZone, OnInit, Renderer2, ElementRef } from '@angular/core';
import { FieldBase } from '../FieldBase';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

@Component({
  selector: 'app-drop-down-field',
  templateUrl: './drop-down-field.component.html',
  styleUrls: ['./drop-down-field.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DropDownFieldComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => DropDownFieldComponent), multi: true }
  ]
})
export class DropDownFieldComponent extends FieldBase implements OnInit {
  tempValue: any;
  intervalId: any;

  default;

  @Input() defaultValue: string;
  @Input() anyValue: string;
  @Input() defaultDisableValue;
  @Input()
  set dataList(value: any[]) {
    if (this.anyValue !== null && this.anyValue !== undefined) {
      // when default label and any value are setup -> issue is that it generate two null options, so to fix it any is  -1;
      if (this.anyValue === 'true' && this.defaultValue !== 'false') {
        this._dataList = [{ description: 'Any', id: -1 }];
      } else {
        this._dataList = [{ description: 'Any', id: null }];
      }
      this._dataList = this._dataList.concat(value);
    } else {
      this._dataList = value;
    }
  }
  get dataList() {
    return this._dataList;
  }

  private _dataList = [];

  constructor(renderer2: Renderer2, zone: NgZone, el: ElementRef) {
    super(renderer2, zone, el);
  }
  ngOnInit(): void {
    if (this.defaultValue === 'false') {
      this.default = null;
      return;
    }
    if (this.defaultValue === null || this.defaultValue === undefined) {
      this.defaultValue = '--Select ' + this.label + '--';
    }
    this.default = this.defaultValue;
  }
  writeValue(obj: any): void {
    // if obj is not null and data list is null then wait for datalist.
    if (obj !== null && obj !== undefined) {
      if (this.dataList === null || this.dataList === undefined) {
        this.intervalId = setInterval(this.checkIfListIsInited.bind(this), 100);
        this.tempValue = obj;
        return;
      }
    }
    this.value = obj;
  }
  onChange(event) {
    if (event.key === 'Tab') {
      return;
    }
    this.value = event.target.value === 'null' ? null : event.target.value;
    this.propagateChange(this.value);
  }
  setDisabledState?(isDisabled: boolean): void {
    super.setDisabledState(isDisabled);
    if (isDisabled === true) {
      this.default = this.defaultDisableValue;
    } else if (this.defaultValue !== 'false') {
      this.default = this.defaultValue;
    } else if (this.defaultValue === 'false') {
      this.default = null;
    }
  }
  /*
   * Because of asyn call to get value and get datalist, there is problem with select value in list,
   * checkIfListIsInited() is fixing this issue.
   */
  private checkIfListIsInited() {
    if (this.dataList !== null && this.dataList !== undefined) {
      this.value = this.tempValue;
      clearInterval(this.intervalId);
    }
  }
}
