import { Component, OnInit } from '@angular/core';
import { SeleniumCommand } from '../../../projects/shared/src/lib/models/selenium/SeleniumCommand';
import { BasicViewModel } from '../../../projects/shared/src/lib/models/basicViewModel';
import { SignalSzwagierService } from 'projects/shared/src/lib/services/signalr/signal-szwagier.service';

@Component({
  selector: 'app-szwagier-rc',
  templateUrl: './szwagier-rc.component.html',
  styleUrls: ['./szwagier-rc.component.scss']
})
export class SzwagierRCComponent implements OnInit {
  hubConnection: signalR.HubConnection;
  typeOfCommand: BasicViewModel[] = [{label:'WebDriverOperationType',value:'WebDriverOperationType'}];
  typeOfSubCommand: BasicViewModel[] = [];
  commands: BasicViewModel[] = [];
  showValue1: boolean;
  showSendBtn: boolean;

  commandModel: SeleniumCommand;
  commandsHistory: { id: number, value: SeleniumCommand }[];
  seletedCommandsHistory: { id: number, value: SeleniumCommand }[];
  constructor(private signalSzwagierService: SignalSzwagierService) { }

  ngOnInit() {

    this.resetSelection();

    this.commandsHistory = JSON.parse(localStorage.getItem('rc-history'));
    if (this.commandsHistory == null) {
      this.commandsHistory = [];
    }
    this.hubConnection = this.signalSzwagierService.start();
  }
  typeOfCommandChange(event) {
    this.typeOfSubCommand = [{ label: 'BrowserOperation', value: 'BrowserOperation' },
    { label: 'ElementOperation', value: 1 },
    { label: 'Locators', value: 2 },
    { label: 'SelectElementOperation', value: 3 },
    { label: 'BrowserNavigationOperation', value: 4 }];
  }
  typeOfSubCommandChange(event) {
    switch (event.value) {
      case 1:
        this.commands = [{ label: 'Click', value: { value: 0, type: 0 } },
        { label: 'SendKeys', value: { value: 1, type: 1 } }, { label: 'Clear', value: { value: 2, type: 0 } },
        { label: 'Submit', value: { value: 3, type: 0 } }, { label: 'Text', value: { value: 4, type: 0 } },
        { label: 'Enabled', value: { value: 5, type: 0 } }, { label: 'Displayed', value: { value: 6, type: 0 } },
        { label: 'DragAndDropToOffset', value: { value: 7, type: 2 } }];
        break;
      case 2:
        this.commands = [{ label: 'ByClassName', value: { value: 0, type: 1 } }, { label: 'ByCssSelector', value: { value: 1, type: 1 } },
        { label: 'ById', value: { value: 2, type: 1 } }, { label: 'ByLinkText', value: { value: 3, type: 1 } },
        { label: 'ByName', value: { value: 4, type: 1 } }, { label: 'ByPartialLinkText', value: { value: 5, type: 1 } },
        { label: 'ByTagName', value: { value: 6, type: 1 } }, { label: 'ByXPath', value: { value: 7, type: 1 } }];
        break;
      case 4:
        this.commands = [//{ label: 'WebDriverWait', value: 'WebDriverWait' }, { label: 'WaitUntil', value: 'WaitUntil' },
          { label: 'WaitUntilBrowserReady', value: { value: 2, type: 0 } }, { label: 'GoToUrl', value: { value: 3, type: 1 } }];
        // { label: 'Title', value: 'Title' }, { label: 'Url', value: 'Url' },
        // { label: 'PageSource', value: 'PageSource' }, { label: 'WindowHandles', value: 'WindowHandles' },
        // { label: 'GetScreenshot', value: 'GetScreenshot' }, { label: 'Url', value: 'Url' },
        //  { label: 'Title', value: 'Title' }, { label: 'Url', value: 'Url' }]
        break;

    }
    this.commandModel.webDriverOperationType = event.value;
  }
  commandChange(event) {
    switch (event.value.type) {
      case 1:
        this.showValue1 = true;
        this.commandModel.values = [''];
        break;
    }
    this.commandModel.operationId = event.value.value;
    this.showSendBtn = true;
  }
  value1Change(event) {
    this.commandModel.values[0] = event.target.value;

  }
  commandsHistoryChange(event) {
    if (event.value == null || event.value.length === 0) {
      this.seletedCommandsHistory = null;
    } else {
      this.seletedCommandsHistory = event.value;
    }
  }
  removeHistoryClick() {
    for (let i = 0; i < this.commandsHistory.length; i++) {
      const element = this.commandsHistory[i];
      const removeEle = this.seletedCommandsHistory.find(x => x.id === element.id);
      if (removeEle != null) {
        this.commandsHistory.splice(i, 1);
        i--;
      }
    }
    localStorage.setItem('rc-history', JSON.stringify(this.commandsHistory));
    this.seletedCommandsHistory = null;
  }
  sendClick() {
    /*this.commandsHistory.push(
      {
        label: this.commandModel.webDriverOperationType + ':' + this.commandModel.operationId + '-' + this.commandModel.values,
        value: {
          id: Math.random(),
          value: JSON.parse(JSON.stringify(this.commandModel))
        }
      });
    localStorage.setItem('rc-history', JSON.stringify(this.commandsHistory));
    this.hubConnection.invoke('SendCommand', [this.commandModel]);*/
  }
  sendHistoryClick() {
    const commands: SeleniumCommand[] = [];
    this.seletedCommandsHistory.forEach(x => {
      commands.push(x.value);
    });
    this.hubConnection.invoke('SendCommand', commands);
  }
  private resetSelection() {
    this.showValue1 = false;
    this.showSendBtn = false;
    this.seletedCommandsHistory = null;
    this.commandModel = {
      operationId: null,
      values: null,
      webDriverOperationType: null
    };

  }
}
