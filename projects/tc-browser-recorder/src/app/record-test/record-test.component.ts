import { Component, OnInit, ChangeDetectorRef, NgZone, AfterContentInit, } from '@angular/core';
import { OperatorModel } from '../../../../shared/src/lib/models/operatorModel';
import { StoreService } from '../services/store.service';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';
import { GuidGeneratorService } from './../../../../shared/src/lib/services/guid-generator.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectViewModel } from '../../../../shared/src/lib/models/project/projectViewModel';
import { ProjectDomainViewModel } from '../../../../shared/src/lib/models/project/projectDomainViewModel';


import { Project } from '../ViewModels/Project';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { ProjectConfigService } from '../services/project-config.service';
// import { ActivatedRoute, Route,} from '@angular/router';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { settings } from 'cluster';

@Component({
  selector: 'app-record-test',
  templateUrl: './record-test.component.html',
  styleUrls: ['./record-test.component.scss']
})
export class RecordTestComponent implements OnInit {
  operatorsData: OperatorModel[] = [];
  isStarted: boolean = false;
  domain: string;
  project: ProjectViewModel;
  projects: Array<ProjectViewModel>;
  projectDomain: ProjectDomainViewModel;
  chromeTab: chrome.tabs.Tab;
  tabId: number;
  projectId: number;

  constructor(private storeService: StoreService,
    private guidGeneratorService: GuidGeneratorService,
    private http: HttpClientService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private projectConfigService: ProjectConfigService
  ) { }

  ngOnInit() {
    this.projectId = +this.activatedRoute.snapshot.paramMap.get('id');
    this.activatedRoute.queryParams.subscribe(x => this.domain = atob(x.url));

    if (this.activatedRoute.snapshot.data && this.activatedRoute.snapshot.data.project) {
      this.projects = this.activatedRoute.snapshot.data.project;
      this.project = this.projects.filter(x => x.id == this.projectId)[0];
      this.storeService.setProject(this.project);
    }

    this.isStarted = true;
    this.createNewTabAndNavigate(this.domain, e => {
      chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (tabId == e.id && changeInfo.status == "complete") {
          this.addChromeListener();
          chrome.tabs.onUpdated.removeListener(function (a, b, c) { console.log('Unregistered event'); });
        }
      });
    });

  }

  private createNewTabAndNavigate(url: string, _callback: (t: chrome.tabs.Tab) => void) {
    chrome.tabs.create({ 'url': url }, tab => {
      this.chromeTab
      localStorage.setItem('tabId', tab.id.toString());
      this.chromeTab = tab;
      _callback(tab);
    });
  }


  public addChromeListener(): void {
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

  private setupPageScript(): void {
    this.sendMessageToBrowser('startBrowserActionMonitor');
    if (this.operatorsData.length === 0) {
      this.sendMessageToBrowser('getUrl');
    }
    //TODO add config
    // this.sendMessageToBrowser('startXHRMonitor');
  }
  // DO WE NEED THSI METHOD IF NOT????? 
  private getTabIdFromUrl(url): string {
    const id = url.substr(url.indexOf("?") + 4);
    if (isNaN(+id)) {
      this.ngZone.run(() =>
        this.router.navigate(['/information-page', 'refreshPage'])
      );
    }
    return id == null ? null : id;
  }

  private addNewOperation(request: OperatorModel): void {
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
    if (this.projectConfigService.getConfig("Monitoring Http Calls") == "true") {
      this.operatorsData.push({
        action: 'takeScreenshot',
        path: null,
        value: null,
        guid: this.guidGeneratorService.get()
      });
    }
  }


  private appendLastOperation(request: OperatorModel): void {
    if (this.operatorsData.length === 0) {
      throw new Error('You cannot call updateLastOperation() when operatorsData is empty.');
    }
    if (request.value === 'Keys.BACKSPACE') {
      this.operatorsData[this.operatorsData.length - 1].value =
        this.operatorsData[this.operatorsData.length - 1]
          .value.slice(0, this.operatorsData[this.operatorsData.length - 1].value.length - 1);
      return;
    }
    this.operatorsData[this.operatorsData.length - 1].value += request.value as string;
  }





  private beforeStart(request: OperatorModel): void {
    if (request.action === "goToUrl") {

      const matches = (request.value as string).match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
      console.log(this.domain);
      this.domain = matches && matches[1];
      this.domain = this.domain.replace(/^(https?\:\/\/)?www\./i, '');
      console.log(this.domain);
      this.http.get('project/domain/' + this.domain).toPromise<any>().then((response: ProjectViewModel) => {
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

  removeOperatorItem(index: number) {
    this.operatorsData.splice(index, 1);
    this.cdr.detectChanges();
  }


  sendMessageToBrowser(methodName): void {
    // if (localStorage.getItem('tabId') == null || this.getTabIdFromUrl(location.href) != localStorage.getItem('tabId')) {
    //   var id = this.getTabIdFromUrl(location.href);
    //   localStorage.setItem('tabId', id);
    // }
    try {

      chrome.tabs.sendMessage(this.chromeTab.id, { method: methodName }, (response) => {
        if (response === undefined) {
          console.log('undefined response');
          this.ngZone.run(() =>
            this.router.navigate(['/information-page', 'refreshPage'])
          );
        } else {
          console.log('background script running');
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

}
