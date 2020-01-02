import { Component, OnInit, HostListener, ContentChild, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-operator-item',
  templateUrl: './operator-item.component.html',
  styleUrls: ['./operator-item.component.scss']
})
export class OperatorItemComponent implements OnInit {

  @Input('type') type: string;
  private _content: string;
  @Input()
  public get content(): string {
    return this._content;
  }
  public set content(v: string) {
    this._content = v;
    this.contentChange.emit(v);
  }

  @Output() contentChange: EventEmitter<string> = new EventEmitter<string>();

  isEditMode = false;


  private contentTemp: string;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {

  }
  operatorItemClick() {
    if (this.type === 'action') {
      return;
    }
    this.isEditMode = true;
    this.contentTemp = this.content;
    this.cdr.detectChanges();
  }
  approveClick() {
    this.content = this.contentTemp;

    this.isEditMode = false;
    this.cdr.detectChanges();
  }
  cancelClick() {

    this.isEditMode = false;
    this.cdr.detectChanges();
  }
  valueUpdate(event: any) {
    this.contentTemp = event.target.value;
  }
}
