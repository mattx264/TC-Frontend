import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectTestViewModel } from 'projects/shared/src/lib/viewModels/project-test-view-model';
import { TestInfoViewModel } from 'projects/shared/src/lib/viewModels/testInfo-ViewModel';
import { OperatorModel, OperatorModelStatus } from 'projects/shared/src/lib/models/operatorModel';
import { SeleniumCommand } from 'projects/shared/src/lib/models/selenium/SeleniumCommand';
import { SignalSzwagierService } from 'projects/shared/src/lib/services/signalr/signal-szwagier.service';
import { SzwagierModel } from 'projects/shared/src/lib/models/szwagierModel';
import { MatDialog } from '@angular/material';
import { DialogSelectBrowserEngine } from './dialog-select-browser-engine';
import { TestProgressMessage } from 'projects/shared/src/lib/models/TestProgressMessage';
import { Lightbox, IAlbum } from 'ngx-lightbox';
import { SzwagierType } from 'projects/shared/src/lib/models/SzwagierType';

@Component({
  selector: 'app-project-test-run',
  templateUrl: './project-test-run.component.html',
  styleUrls: ['./project-test-run.component.scss']
})
export class ProjectTestRunComponent implements OnInit {
  projectId: number;
  testId: number;
  testInfo: TestInfoViewModel;
  operators: OperatorModelStatus[];
  hubConnection: signalR.HubConnection;
  selectedBrowserEngine: SzwagierModel;
  commandsRender: OperatorModelStatus[];
  screenshots: IAlbum[] = [];
  constructor(
    private httpService: HttpClientService,
    private activatedRoute: ActivatedRoute,
    signalSzwagierService: SignalSzwagierService,
    public dialog: MatDialog,
    public lightbox: Lightbox) {
    this.hubConnection = signalSzwagierService.start(SzwagierType.SzwagierDashboard);
    this.activatedRoute.parent.params.subscribe(x => {
      this.projectId = +x.id;
    });
    this.testId = +this.activatedRoute.snapshot.paramMap.get('testid');
    this.httpService.get('testInfo/' + this.testId).subscribe((data: TestInfoViewModel) => {
      this.testInfo = data;
      this.operators = this.openOperators(this.testInfo.commands);
      this.commandsRender = this.operators.filter(x => x.action !== 'takeScreenshot');
    });
  }

  ngOnInit() {
    this.openDialog();
  }
  showBrowserEngineDialogClick() {
    this.openDialog();
  }
  lightboxImageClick(index: number) {

    this.lightbox.open(this.screenshots, index);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogSelectBrowserEngine, {
      width: '1000px'
    });

    dialogRef.afterClosed().subscribe(result => {

      this.selectedBrowserEngine = result;
    });
  }
  sendClick() {
    this.commandsRender.forEach(x => {
      x.status = null;
      x.imagePath = null
    });
    const message = {
      ReceiverConnectionId: this.selectedBrowserEngine.connectionId,
      Commands: this.testInfo.commands,
      testInfoId: this.testInfo.id
    }
    this.hubConnection.invoke('SendCommand', message);
    this.startTestProgressMonitor();
  }
  startTestProgressMonitor() {

    this.operators[0].status = 'inprogress';
    this.hubConnection.on('TestProgress', (testProgressMessage: TestProgressMessage) => {
      const test = this.operators.find(x => x.guid === testProgressMessage.commandTestGuid);
      if (testProgressMessage.isSuccesful) {
        test.status = 'done';
        const currentIndex = this.operators.findIndex(x => x.guid === testProgressMessage.commandTestGuid);
        this.operators[currentIndex + 1].status = 'inprogress';

      } else {
        test.status = 'failed';
      }
    });
    this.hubConnection.on('ReciveScreenshot', (data) => {
      this.screenshots.push({ src: data.imagePath, thumb: data.imagePath });
      const currentIndex = this.operators.findIndex(x => x.guid === data.commandTestGuid);
      this.operators[currentIndex - 1].imagePath = data.imagePath;
    });
  }
  //TODO move this to shared 
  openOperators(seleniumCommand: SeleniumCommand[]) {
    var data: OperatorModel[] = [];
    for (let i = 0; i < seleniumCommand.length; i++) {
      const row = seleniumCommand[i];

      switch (+row.webDriverOperationType) {

        case 0:
          switch (+row.operationId) {

            case 17:
              data.push({ value: null, guid: row.guid, action: 'takeScreenshot', path: null });
              break;
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
              data.push({ value: row.values[1], guid: row.guid, action: 'selectByValue', path: row.values[0] });
              break;
            default:
              throw new Error("operationId not implemented: webDriverOperationType=" + row.webDriverOperationType + "  operationId=" + row.operationId)
          }
          break;
        case 4:
          switch (+row.operationId) {
            case 3:
              data.push({ value: row.values[0], guid: row.guid, action: 'goToUrl', path: null });
              break;
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
              data.push({ value: null, guid: row.guid, action: 'click', path: row.values[0] });
              break;
            case 1:
              data.push({ value: row.values[1], guid: row.guid, action: 'sendKeys', path: row.values[0] });
              break;
            default:
              throw new Error("operationId not implemented: webDriverOperationType=" + row.webDriverOperationType + "  operationId=" + row.operationId)
          }
          break;
        default:
          throw new Error("WebDriverOperationType not implemented" + row.webDriverOperationType)
      }

    }
    return data;
  }
}
