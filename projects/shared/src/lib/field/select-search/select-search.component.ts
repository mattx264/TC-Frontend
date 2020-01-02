import { Component, OnInit, Input, forwardRef, Renderer2, NgZone, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { BasicViewModel, BasicViewModelSelectSearch } from '../../../viewModels/basic-view-model';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { FieldBase } from '../FieldBase';
import { isNullOrUndefined } from 'util';
import { NgSelectComponent } from '../../../../lib/ng-select/ng-select.component';

@Component({
  selector: 'app-select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectSearchComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => SelectSearchComponent), multi: true }
  ]
})
export class SelectSearchComponent extends FieldBase implements OnInit {
  selectedId: number = null;
  isDisabled = false;
  @Input() placeholder: string = null;
  private _items: BasicViewModelSelectSearch[];
  @Input()
  public get items(): BasicViewModelSelectSearch[] {
    return this._items;
  }
  public set items(v: BasicViewModelSelectSearch[]) {
    if (v === undefined) {
      this._items = v; // it is undefined
      return;
    }
    if (v.find(x => x.id === this.selectedId) === undefined) {
      this.selectedId = null;
    }
    this._items = JSON.parse(JSON.stringify(v));
  }
  @Input() defaultValue: string;
  @Input() anyValue: string;
  @Input() defaultDisableValue;
  @ViewChild('ngSelect') ngSelect: NgSelectComponent;
  constructor(renderer2: Renderer2, zone: NgZone, el: ElementRef) {
    super(renderer2, zone, el);
  }

  ngOnInit() {
    if (this.defaultValue === null || this.defaultValue === undefined && this.placeholder === null) {
      const defaultValue = '--Select ' + this.label + '--';
      this.placeholder = defaultValue;
      // this.items.unshift({ id: null, description: defaultValue, disabled: true });
    } else if (this.anyValue === 'true') {
      this.items.unshift({ id: -1, description: 'Any' });
      if (this.placeholder === null) {
        this.selectedId = -1;
      }
    }

  }
  writeValue(obj: any): void {

    this.value = obj;
    if (this.value === null && this.anyValue === 'true' && this.placeholder === null) {
      this.selectedId = -1;
    } else {
      this.selectedId = this.value;
    }
  }
  onChange(event) {
    if (this.anyValue === 'true' && this.placeholder !== null && event.id === -1 || event.id === '-1') {
      this.propagateChange(-1);
    } else if (event.id === -1 || event.id === '-1') {
      this.propagateChange(null);
    } else {
      this.propagateChange(event.id);
    }

  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    if (this.formControl === undefined) {
      this.error = '';
      return;

    }

  }
  focusSelectedItem(): void {
    if (this.ngSelect.selectedItems == null || this.ngSelect.selectedItems.length === 0) {
        return;
    }
    setTimeout(() => {
        if (isNullOrUndefined(this.ngSelect.dropdownPanel)) {
            this.focusSelectedItem();
        } else {
            this.ngSelect.dropdownPanel.scrollInto(this.ngSelect.selectedItems[0]);
        }
    }, 10);
}
}
