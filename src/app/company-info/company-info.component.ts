import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent implements OnInit {
  @Input() dataToImport = {country: 'Poland', companyName: 'Testing Center 2020', email: 'contact@ourdomain.com', isVertical: false};

  // tslint:disable-next-line: new-parens
  @Output() emitYear = new EventEmitter<number>();
  constructor() {}

  ngOnInit() {
  }

}
