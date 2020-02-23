import { OperatorModelStatus } from './../../../../shared/src/lib/models/operatorModel';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SignalSzwagierService } from '../../../../shared/src/lib/services/signalr/signal-szwagier.service';
import { SzwagierType } from '../../../../shared/src/lib/models/SzwagierType';
import { StoreService } from '../services/store.service';
import { MatTableDataSource } from '@angular/material/table';
import { TestProgressMessage } from 'projects/shared/src/lib/models/TestProgressMessage';
import { ProjectConfigService } from 'projects/shared/src/lib/services/project-config.service';
import { SeleniumConverterService } from 'projects/shared/src/lib/services/selenium-converter.service';
import { CommandMessage } from 'projects/shared/src/lib/CommonDTO/CommandMessage';
import { ProjectViewModel } from 'projects/shared/src/lib/viewModels/ProjectViewModel';

@Component({
  selector: 'app-run-test',
  templateUrl: './run-test.component.html',
  styleUrls: ['./run-test.component.scss']
})
export class RunTestComponent implements OnInit {
  hubConnection: signalR.HubConnection;
  commands: OperatorModelStatus[];
  commandsRender: OperatorModelStatus[];

  dataSource: MatTableDataSource<OperatorModelStatus>;
  columns: string[] = ['action', 'path', 'value', 'status'];

  project: ProjectViewModel;
  chromeTab: chrome.tabs.Tab;
  tabId: number;

  constructor(
    private storeService: StoreService,
    signalSzwagierService: SignalSzwagierService,
    private seleniumConverterService: SeleniumConverterService,
    private cdr: ChangeDetectorRef,
    private projectConfigService: ProjectConfigService) {
    this.hubConnection = signalSzwagierService.start(SzwagierType.SzwagierBrowserExtension);
  }
  ngOnInit() {
    this.commands = this.storeService.getOperatorsData();
    this.commandsRender = this.commands.filter(x => x.action !== 'takeScreenshot');
    this.dataSource = new MatTableDataSource<OperatorModelStatus>(this.commandsRender);
  }

  private createNewTabAndNavigate(url: string, _callback: (t: chrome.tabs.Tab) => void) {
    chrome.tabs.create({ 'url': url }, tab => {
      this.chromeTab
      localStorage.setItem('tabId', tab.id.toString());
      this.chromeTab = tab;
      _callback(tab);
    });
  }

  sendClick() {
    this.projectConfigService.getConfigsByProjectId(this.storeService.getProject().id).then(configs => {
      const operatorsData = this.storeService.getOperatorsData();
      var data = this.seleniumConverterService.packageOperators(operatorsData);
      const message: CommandMessage = {
        configurations: configs,
        receiverConnectionId: this.storeService.getSelectedBrowserEngine().connectionId,
        commands: data
      }
      this.hubConnection.invoke('SendCommand', message);
      this.startTestProgressMonitor();
    });
  }

  startTestProgressMonitor() {
    this.commands[0].status = 'inprogress';
    this.hubConnection.on('TestProgress', (testProgressMessage: TestProgressMessage) => {
      const test = this.commands.find(x => x.guid === testProgressMessage.commandTestGuid);
      if (testProgressMessage.isSuccesful) {
        test.status = 'done';
        const currentIndex = this.commands.findIndex(x => x.guid === testProgressMessage.commandTestGuid);
        this.commands[currentIndex + 1].status = 'inprogress';

      } else {
        test.status = 'failed';
      }
      this.cdr.detectChanges();
    });

    this.hubConnection.on('ReciveScreenshot', (data) => {
      const test = this.commands.find(x => x.guid === data.commandTestGuid);
      test.status = 'done';
      const currentIndex = this.commands.findIndex(x => x.guid === data.commandTestGuid);
      this.commands[currentIndex - 1].imagePath = data.imagePath;
      this.cdr.detectChanges();
    });
  }


}
