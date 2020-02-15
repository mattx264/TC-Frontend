import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectTestViewModel } from 'projects/shared/src/lib/viewModels/project-test-view-model';
import { TestInfoViewModel } from 'projects/shared/src/lib/viewModels/testInfo-ViewModel';
import { OperatorModel, OperatorModelStatus } from 'projects/shared/src/lib/models/operatorModel';
import { SeleniumCommand } from 'projects/shared/src/lib/models/selenium/SeleniumCommand';
import { SignalSzwagierService } from 'projects/shared/src/lib/services/signalr/signal-szwagier.service';
import { SzwagierModel } from 'projects/shared/src/lib/models/szwagierModel';
import { MatDialog } from '@angular/material/dialog';
import { DialogSelectBrowserEngine } from './dialog-select-browser-engine';
import { TestProgressMessage } from 'projects/shared/src/lib/models/TestProgressMessage';
import { Lightbox, IAlbum } from 'ngx-lightbox';
import { SzwagierType } from 'projects/shared/src/lib/models/SzwagierType';
import { SeleniumConverterService } from 'projects/shared/src/lib/services/selenium-converter.service';

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
    public lightbox: Lightbox,
    private seleniumConverterService: SeleniumConverterService) {
    this.hubConnection = signalSzwagierService.start(SzwagierType.SzwagierDashboard);
    this.activatedRoute.parent.params.subscribe(x => {
      this.projectId = +x.id;
    });
    this.testId = +this.activatedRoute.snapshot.paramMap.get('testid');
    this.httpService.get('testInfo/' + this.testId).subscribe((data: TestInfoViewModel) => {
      this.testInfo = data;
      this.commandsRender = this.seleniumConverterService.openOperators(this.testInfo.commands);
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
 
}
