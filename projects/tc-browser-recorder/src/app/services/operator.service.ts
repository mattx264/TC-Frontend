import { Injectable } from '@angular/core';
import { OperatorModel } from 'projects/shared/src/lib/models/operatorModel';
import { SeleniumCommand } from 'projects/shared/src/lib/models/selenium/SeleniumCommand';

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
        case 'takeScreenshot':
          data.push({ operationId: 0, webDriverOperationType: 17, guid: row.guid });
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
  openOperators(seleniumCommand: SeleniumCommand[]) {
    var data: OperatorModel[] = [];
    for (let i = 0; i < seleniumCommand.length; i++) {
      const row = seleniumCommand[i];

      switch (+row.operationId) {
        case 3:
          switch (+row.webDriverOperationType) {
            case 4:
              data.push({ value: row.values[0], guid: row.guid, action: 'goToUrl', path: null });
              break;
          }
          break;
        case 0:
          switch (+row.webDriverOperationType) {
            case 5:
              data.push({ value: null, guid: row.guid, action: 'click', path: row.values[0] });
              break;
            case 17:
              data.push({ value: null, guid: row.guid, action: 'takeScreenshot', path: null });
              break;
          }
          break
        case 1:
          switch (+row.webDriverOperationType) {
            case 5:
              data.push({ value: row.values[1], guid: row.guid, action: 'sendKeys', path: row.values[0] });
              break;
          }
          break
        case 2:
          switch (+row.webDriverOperationType) {
            case 5:
              data.push({ value: row.values[1], guid: row.guid, action: 'selectByValue', path: row.values[0] });
              break;
          }
          break
      }

    }
    return data;
  }
}
