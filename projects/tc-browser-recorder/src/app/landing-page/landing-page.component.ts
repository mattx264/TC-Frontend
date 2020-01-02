
import { GuidGeneratorService } from './../../../../shared/src/lib/services/guid-generator.service';
import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { SzwagierModel } from '../../../../shared/src/lib/models/szwagierModel';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProjectViewModel } from '../../../../shared/src/lib/models/project/projectViewModel';
import { ProjectDomainViewModel } from '../../../../shared/src/lib/models/project/projectDomainViewModel';
import { StoreService } from '../services/store.service';
import { OperatorModel } from '../../../../shared/src/lib/models/operatorModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { settings } from 'cluster';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  operatorsData: OperatorModel[] = [];
  szwagiersConsoles: SzwagierModel[] = [];
  selectedSzwagierConsole: SzwagierModel;
  isStarted: boolean = false;
  domain: string;
  project: ProjectViewModel;
  projectDomain: ProjectDomainViewModel;
  formGroupp: any;
  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private storeService: StoreService,
    private guidGeneratorService: GuidGeneratorService,
    private httpClientService: HttpClientService
  ) {


  }
  ngOnInit() {
    chrome.runtime.onMessage.addListener(
      (request: { type: string, data: OperatorModel }, sender, sendResponse) => {
        if (request.type === 'getInfo' && request.data.action === 'isStarted') {
          sendResponse(this.isStarted);
          this.setupPageScript();
          return;
        }
        if (this.isStarted === false) {
          this.beforeStart(request.data);
          return;
        }
        if (request.type == 'insert') {
          this.addNewOperation(request.data);
        } else if (request.type == 'appendLastValue') {
          this.appendLastOperation(request.data);
        }
        this.cdr.detectChanges();
      });
    this.setupPageScript();

  }

  startRecordingClick() {
    this.isStarted = true;
    this.sendMessageToBrowser('getUrl');
  }
  saveClick() {
    this.storeService.setOperatorsData(this.operatorsData);

    this.ngZone.run(() =>
      this.router.navigate(['/save-test'])
    );
  }
  sendClick() {
    this.storeService.setOperatorsData(this.operatorsData);

    this.ngZone.run(() =>
      this.router.navigate(['/select-browser-engine'])
    );
  }
  restartClick() {
    this.operatorsData = [];
    this.setupPageScript();

  }
  removeOperatorItem(index: number) {
    this.operatorsData.splice(index, 1);
    this.cdr.detectChanges();
  }
  sendMessageToBrowser(methodName) {
    if (localStorage.getItem('tabId') == null || this.getTabIdFromUrl(location.href) != localStorage.getItem('tabId')) {
      var id = this.getTabIdFromUrl(location.href);
      localStorage.setItem('tabId', id);
    }
    try {
      chrome.tabs.sendMessage(+localStorage.getItem('tabId'), { method: methodName }, (response) => {
        if (response === undefined) {
          this.ngZone.run(() =>
            this.router.navigate(['/information-page', 'refreshPage'])
          );
        } else {
          // Do whatever you want, background script is ready now
        }
      });
    } catch (error) {

      if ((typeof error === "string") && error.indexOf('No matching signature') > -1) {
        this.ngZone.run(() =>
          this.router.navigate(['/information-page', 'refreshPage'])
        );
      } else {
        console.error(error);
        // Dont know what to do with this
        this.ngZone.run(() =>
          this.router.navigate(['/information-page', 'refreshPage'])
        );
      }
    }
  }
  createNewProject() {
    window.open("http://localhost:4200/project-create")
  }
  private setupPageScript() {
    this.sendMessageToBrowser('startBrowserActionMonitor');
    if (this.operatorsData.length === 0) {
      this.sendMessageToBrowser('getUrl');
    }
    //TODO add config
    // this.sendMessageToBrowser('startXHRMonitor');
  }
  private getTabIdFromUrl(url): string {
    const id = url.substr(url.indexOf("?") + 4);
    if (isNaN(+id)) {
      this.ngZone.run(() =>
        this.router.navigate(['/information-page', 'refreshPage'])
      );      
    }
    return id == null ? null : id;
  }
  private addNewOperation(request: OperatorModel) {
    const newOperation: OperatorModel = {
      action: request.action,
      path: request.path,
      value: request.value,
      guid: this.guidGeneratorService.get()
    }

    switch (request.action) {
      case 'xhrStart':
      case 'xhrDone':
        newOperation.value = request.value.toString()
        break;
    }

    this.operatorsData.push(
      newOperation
    );
  }
  private appendLastOperation(request: OperatorModel) {
    if (this.operatorsData.length === 0) {
      throw new Error("You cannot call updateLastOperation() when operatorsData is empty.");
    }
    if (request.value === 'Keys.BACKSPACE') {
      this.operatorsData[this.operatorsData.length - 1].value =
        this.operatorsData[this.operatorsData.length - 1].value.slice(0, this.operatorsData[this.operatorsData.length - 1].value.length - 1);
      return;
    }
    this.operatorsData[this.operatorsData.length - 1].value += <string>request.value;
  }

  private beforeStart(request: OperatorModel) {
    if (request.action === "goToUrl") {

      var matches = (request.value as string).match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
      this.domain = matches && matches[1];
      this.domain = this.domain.replace('www.', '');
      this.httpClientService.get('project/domain/' + this.domain).toPromise<any>().then((response: ProjectViewModel) => {
        if (response == null) {
          return;
        }
        this.project = response;
        this.storeService.setProject(this.project);
        this.projectDomain = this.project.projectDomain.find(x => x.domain === this.domain);
        this.cdr.detectChanges();
      });
      // this.projects.forEach(p => {
      //   if (p.projectDomain.find(x => x.domain === this.domain)) {
      //     this.project = p;
      //     this.storeService.setProject(this.project);
      //     this.projectDomain = p.projectDomain.find(x => x.domain === this.domain);
      //     this.cdr.detectChanges();
      //   }
      // });
    }
  }
}
