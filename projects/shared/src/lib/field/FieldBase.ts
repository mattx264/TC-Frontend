import { ControlValueAccessor, Validator, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Input, NgZone, OnChanges, Renderer2, ViewChild, ElementRef, ContentChild } from '@angular/core';
import { FieldConfig } from './models/field-config';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

export class FieldBase implements ControlValueAccessor, OnChanges, Validator {
    private _disabled = false;
    private _isRequired = true;
    private _readonly = false;

    matcher = new MyErrorStateMatcher();
    protected formControl: FormControl;

    public value;
    public error;

    @Input() externalError;
    @Input() label;
    @Input() horizontalForm = false;
    @Input() fieldConfig: FieldConfig;
    @Input() extraInfo: string;
    @Input()
    public set isRequired(value: boolean) {
        this._isRequired = JSON.parse(value.toString());
    }
    public get isRequired(): boolean {
        return this._isRequired;
    }
    @Input()
    public set readonly(value: boolean) {
        this._readonly = JSON.parse(value.toString());
    }
    public get readonly(): boolean {
        return this._readonly;
    }
    public set disabled(value: boolean) {
        this._disabled = value;
        if (this._disabled !== null || this._disabled !== undefined) {
            // check if values are different
            if (this._disabled !== value) {
                this._disabled = value;
                this.setDisabledState(this._disabled);
            }
        } else {
            this._disabled = value;
        }
    }
    public get disabled(): boolean {
        return this._disabled;
    }

    @ViewChild('field', { static: false }) field;

    constructor(public renderer2: Renderer2, private zone: NgZone, private el: ElementRef) {
        if (this.fieldConfig === undefined || this.fieldConfig === null) {
            this.fieldConfig = {
                labelCol: '',
                fieldCol: '',
                errorCol: '',
                isFieldRow: true,
                isLabelRow: true
            };
        }

    }
    onTouched = (_: any) => {

    }
    ngOnChanges(changes): void {

    }
    writeValue(obj: any): void {

        this.value = obj;
    }
    registerOnChange(fn: any): void {
        this.onTouched = fn;
        this.propagateChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        if (this.field === undefined) {
            this.renderer2.setAttribute(this.el.nativeElement, 'disabled', 'true');
        } else {
            this.renderer2.setProperty(this.field.nativeElement, 'disabled', isDisabled);
        }
        this._disabled = isDisabled;
        this.reValidate();
    }
    onChange(event) {
        if (event.key === 'Tab') {
            return;
        }

        this.value = event.target.value;
        this.propagateChange(this.value);
    }
    reValidate() {
        if (this.formControl === undefined || this.formControl === null) {
            this.error = '';
        } else {
            this.validate(this.formControl);
        }
    }

    validate(c: FormControl) {
        this.formControl = c;
        this.error = '';
        if (this._disabled !== true && this.isRequired === true && (c.dirty || c.touched)) {
            if (c.value === '' || c.value === null || c.value === undefined) {
                this.error = this.label + ' is required.';
            } else if (this.formControl.getError('invalid')) {
                this.error = this.label + ' is invalid.';
            }
        }
        // TODO Finish this
        // // double check for async validaion
        // this.formControl.statusChanges.subscribe(x => {
        //     if (x === 'INVALID' && this.error === '' && (c.dirty || c.touched)) {
        //         this.error = this.label + ' is invalid.';
        //     }
        // });
        if (this.error === '' && this.externalError !== '' && this.externalError !== undefined) {
            this.error = this.externalError;
        }
        return null;
    }
    propagateChange = (_: any) => { };

}
