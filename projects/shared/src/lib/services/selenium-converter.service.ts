import { Injectable } from '@angular/core';
import { SeleniumCommand } from '../models/selenium/SeleniumCommand';
import { OperatorModel } from '../models/operatorModel';

@Injectable({
  providedIn: 'root'
})
export class SeleniumConverterService {

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
        case 'xhrStart':
          data.push({
            operationId: 0, webDriverOperationType: 7, values: [row.path, row.value], guid: row.guid
          });
          break;
        case 'xhrDone':
          data.push({
            operationId: 1, webDriverOperationType: 7, values: [row.path, row.value], guid: row.guid
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
      const result=this.openOperator(row)
      if(result !=null){
        data.push(result);
      } else{
        console.error("SOMETHING IS WRONG WITH COMMAND");
        console.error(row);
      }
    

    }
    return data;
  }
  openOperator(row: SeleniumCommand) {
    switch (+row.webDriverOperationType) {

      case 0:
        switch (+row.operationId) {

          case 17:
            return { value: null, guid: row.guid, action: 'takeScreenshot', path: null };

          default:
            throw new Error("operationId not implemented: webDriverOperationType=" + row.webDriverOperationType + "  operationId=" + row.operationId)
        }
        break
      case 1:
        switch (+row.operationId) {
          default:
            throw new Error("operationId not implemented: webDriverOperationType=" + row.webDriverOperationType + "  operationId=" + row.operationId)
        }
        break
      case 2:
        switch (+row.operationId) {
          case 5:
            return { value: row.values[1], guid: row.guid, action: 'selectByValue', path: row.values[0] };
          default:
            throw new Error("operationId not implemented: webDriverOperationType=" + row.webDriverOperationType + "  operationId=" + row.operationId)
        }
        break;
      case 4:
        switch (+row.operationId) {
          case 3:
            return { value: row.values[0], guid: row.guid, action: 'goToUrl', path: null };
          case 18:
            //CloseBrowser - Right now dont display this 
            break;
          default:
            throw new Error("operationId not implemented: webDriverOperationType=" + row.webDriverOperationType + "  operationId=" + row.operationId)
        }
        break;
      case 5:
        switch (+row.operationId) {
          case 0:
            return { value: null, guid: row.guid, action: 'click', path: row.values[0] };
          case 1:
            return { value: row.values[1], guid: row.guid, action: 'sendKeys', path: row.values[0] };
          default:
            throw new Error("operationId not implemented: webDriverOperationType=" + row.webDriverOperationType + "  operationId=" + row.operationId)
        }
        break;
      default:
        throw new Error("WebDriverOperationType not implemented" + row.webDriverOperationType)
    }
  }
  // openOperators(seleniumCommand: SeleniumCommand[]) {
  //   var data: OperatorModel[] = [];
  //   for (let i = 0; i < seleniumCommand.length; i++) {
  //     const row = seleniumCommand[i];

  //     switch (+row.operationId) {
  //       case 3:
  //         switch (+row.webDriverOperationType) {
  //           case 4:
  //             data.push({ value: row.values[0], guid: row.guid, action: 'goToUrl', path: null });
  //             break;
  //         }
  //         break;
  //       case 0:
  //         switch (+row.webDriverOperationType) {
  //           case 5:
  //             data.push({ value: null, guid: row.guid, action: 'click', path: row.values[0] });
  //             break;
  //           case 17:
  //             data.push({ value: null, guid: row.guid, action: 'takeScreenshot', path: null });
  //             break;
  //         }
  //         break
  //       case 1:
  //         switch (+row.webDriverOperationType) {
  //           case 5:
  //             data.push({ value: row.values[1], guid: row.guid, action: 'sendKeys', path: row.values[0] });
  //             break;
  //         }
  //         break
  //       case 2:
  //         switch (+row.webDriverOperationType) {
  //           case 5:
  //             data.push({ value: row.values[1], guid: row.guid, action: 'selectByValue', path: row.values[0] });
  //             break;
  //         }
  //         break
  //     }

  //   }
  //   return data;
  // }
}
