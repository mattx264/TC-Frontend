import { Injectable } from '@angular/core';
import { OperatorModel } from 'projects/shared/src/lib/models/operatorModel';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {

  constructor() { }
  packageOperators(operatorsData: OperatorModel[]) {
    var data = [];
    for (let i = 0; i < operatorsData.length; i++) {
      const row = operatorsData[i];

      switch (row.action) {
        case 'goToUrl':
          data.push({
            operationId: 3, webDriverOperationType: 4, values: [row.value], guid: row.guid
          });
          break;
        case 'click':
          data.push({
            operationId: 0, webDriverOperationType: 5, values: [row.path], guid: row.guid
          });
          break;
        case 'sendKeys':
          data.push({
            operationId: 1, webDriverOperationType: 5, values: [row.path, row.value], guid: row.guid
          });
          break;
        case 'selectByValue':
          data.push({
            operationId: 2, webDriverOperationType: 5, values: [row.path, row.value], guid: row.guid
          });
          break;
      }
    }
    // close browser
    data.push({
      operationId: 18, webDriverOperationType: 4
    });
    return data;
  }
}
