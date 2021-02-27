import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';
import { ActivatedRoute } from '@angular/router';
import { TestInfoViewModel } from 'projects/shared/src/lib/viewModels/testInfo-ViewModel';
import { OperatorModelStatus } from 'projects/shared/src/lib/models/operatorModel';
import { SignalSzwagierService } from 'projects/shared/src/lib/services/signalr/signal-szwagier.service';
import { SzwagierModel } from 'projects/shared/src/lib/models/szwagierModel';
import { MatDialog } from '@angular/material/dialog';
import { DialogSelectBrowserEngine } from './dialog-select-browser-engine';
import { TestProgressMessage } from 'projects/shared/src/lib/models/TestProgressMessage';
import { Lightbox } from 'ngx-lightbox';
import { SzwagierType } from 'projects/shared/src/lib/models/SzwagierType';
import { SeleniumConverterService } from 'projects/shared/src/lib/services/selenium-converter.service';
import { ProjectConfigService } from 'projects/shared/src/lib/services/project-config.service';
import { ConfigProjectModel } from 'projects/shared/src/lib/models/project/configProjectModel';
import { CommandMessage } from 'projects/shared/src/lib/CommonDTO/CommandMessage';
import { ProjectTestConfigViewModel } from 'projects/shared/src/lib/viewModels/ProjectTestConfigViewModel';
import { ConfigProjectTestEnum } from 'projects/shared/src/lib/enums/config-project-test-enum';
import { SnackbarService } from 'projects/shared/src/lib/services/snackbar.service';
import { TestScreenshot } from 'src/app/modals/project-test/test-screenshot';
import { TestInfoConfigClient, TestInfoConfigViewModel } from '../../../../../projects/shared/src/client-api';

@Component({
  selector: 'app-project-test-run',
  templateUrl: './project-test-run.component.html',
  styleUrls: ['./project-test-run.component.scss']
})
export class ProjectTestRunComponent implements OnInit, OnDestroy {
  projectId: number;
  testId: number;
  testInfo: TestInfoViewModel;
  isTestRuning: boolean = false;
  //operators: OperatorModelStatus[];
  hubConnection: signalR.HubConnection;
  selectedBrowserEngine: SzwagierModel;
  commandsRender: OperatorModelStatus[];
  screenshots: TestScreenshot[] = [];

  showSettings: boolean;
  configProject: ConfigProjectModel[];
  constructor(
    private httpService: HttpClientService,
    private activatedRoute: ActivatedRoute,
    private signalSzwagierService: SignalSzwagierService,
    public dialog: MatDialog,
    public lightbox: Lightbox,
    private seleniumConverterService: SeleniumConverterService,
    private projectConfigService: ProjectConfigService,
    private snackbarService: SnackbarService,
    private testInfoConfig: TestInfoConfigClient
  ) {
    this.hubConnection = signalSzwagierService.start(SzwagierType.SzwagierDashboard);
    this.activatedRoute.parent.params.subscribe(x => {
      this.projectId = +x.id;
    });
    this.testId = +this.activatedRoute.snapshot.paramMap.get('testid');
    this.httpService.get('testInfo/' + this.testId).subscribe((data: TestInfoViewModel) => {
      this.testInfo = data;
      this.commandsRender = this.seleniumConverterService.openOperators(this.testInfo.commands);
    });

    this.projectConfigService.getConfigsByTestId(this.testId).then(data => {
      this.configProject = data;
    });
  }

  ngOnInit() {
    this.selectedBrowserEngine = this.signalSzwagierService.selectedBrowserEngine;
    if (this.selectedBrowserEngine == null) {
      this.openDialog();
    }
  }

  ngOnDestroy(): void {
    this.hubConnection.off('ReciveScreenshot');
    this.hubConnection.off('TestProgress');
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
      this.signalSzwagierService.selectedBrowserEngine = this.selectedBrowserEngine;
    });
  }
  async saveTectConfigClick() {
    let data: TestInfoConfigViewModel[] = [];
    this.configProject.forEach(config => {
      let value = config.value;
      if (config.valueType === ConfigProjectTestEnum.Boolean) {
        value = value == false ? 'false' : 'true';
      }
      data.push(new TestInfoConfigViewModel({
        configProjectTestId: config.configProjectTestId,
        id: config.id,
        testInfoId: this.testId,
        value: value
      }));
    });
    await this.testInfoConfig.post(data).toPromise();
    this.projectConfigService.getConfigsByTestId(this.testId).then(data => {
      this.configProject = data;
    });
    this.snackbarService.showSaveSuccessful();
  }
  closeTectConfigClick() {
    this.showSettings = false;
    this.projectConfigService.getConfigsByTestId(this.testId).then(data => {
      this.configProject = data;
    });
  }
  sendClick() {
    if (this.selectedBrowserEngine == null || this.selectedBrowserEngine.connectionId == null) {
      this.showBrowserEngineDialogClick();
      return;
    }
    this.commandsRender.forEach(x => {
      x.status = null;
      x.imagePath = null
    });
    const message: CommandMessage = {
      receiverConnectionId: this.selectedBrowserEngine.connectionId,
      commands: this.testInfo.commands,
      testInfoId: this.testInfo.id,
      configurations: this.projectConfigService.getConfigurationModel(this.configProject)
    }
    this.hubConnection.invoke('SendCommand', message);
    this.startTestProgressMonitor();
    this.isTestRuning = true;
  }
  showSettingsClick() {
    this.showSettings = !this.showSettings;
  }
  startTestProgressMonitor() {
    this.screenshots = [];
    this.commandsRender[0].status = 'inprogress';
    this.hubConnection.on('TestProgress', (testProgressMessage: TestProgressMessage) => {
      console.log(testProgressMessage)
      const test = this.commandsRender.find(x => x.guid === testProgressMessage.commandTestGuid);
      if (test == null) {
        throw Error("Test not found");
      }
      if (testProgressMessage.isSuccesful) {
        test.status = 'done';
        const currentIndex = this.commandsRender.findIndex(x => x.guid === testProgressMessage.commandTestGuid);
        this.commandsRender[currentIndex + 1].status = 'inprogress';

      } else {
        test.status = 'failed';
        test.message = testProgressMessage.message;
      }
      const isLastCommand = test.guid === testProgressMessage.commandTestGuid
      if (isLastCommand) {
        this.isTestRuning = false;
      }
    });
    this.hubConnection.on('ReciveScreenshot', (data) => {
      if (this.screenshots.find(x => x.guid == data.commandTestGuid)) {
        return;
      }
      console.log(data);
      this.screenshots.push({ src: data.imagePath, thumb: data.imagePath, guid: data.commandTestGuid });
      const currentIndex = this.commandsRender.findIndex(x => x.guid === data.commandTestGuid);
      this.commandsRender[currentIndex].imagePath = data.imagePath;
    });
  }

}
