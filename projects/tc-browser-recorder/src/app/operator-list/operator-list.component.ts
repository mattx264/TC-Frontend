import { Component, OnInit, Input } from '@angular/core';
import { GuidGeneratorService } from '../../../../shared/src/lib/services/guid-generator.service';
import { OperatorModel } from '../../../../shared/src/lib/models/operatorModel';

@Component({
  selector: 'app-operator-list',
  templateUrl: './operator-list.component.html',
  styleUrls: ['./operator-list.component.scss']
})
export class OperatorListComponent implements OnInit {

  @Input() operatorsData: OperatorModel[] = [];

  private _value: string;
  public get value(): string {
    return this._value;
  }
  public set value(v: string) {
    this._value = v;
  }

  constructor(private guidGeneratorService: GuidGeneratorService) { }

  ngOnInit() {
  }

}
