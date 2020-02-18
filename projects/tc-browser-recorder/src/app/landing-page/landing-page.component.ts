import { Component, OnInit, ViewEncapsulation, NgZone, ChangeDetectorRef } from '@angular/core';
import { SzwagierModel } from '../../../../shared/src/lib/models/szwagierModel';
import { WebsiteService } from 'projects/shared/src/lib/services/website.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectViewModel } from 'projects/shared/src/lib/models/project/projectViewModel';
import { OperatorModel } from 'projects/shared/src/lib/models/operatorModel';
import { BrowserTabService } from '../services/browser-tab.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LandingPageComponent implements OnInit {
  totalProjects: number = 0;
  projects: Array<ProjectViewModel>;
  currentPageProject: ProjectViewModel;
  constructor(
    private router: Router,
    private aRouter: ActivatedRoute,
    private websiteService: WebsiteService,
    private browserTabService: BrowserTabService,
    private store: StoreService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    if (this.aRouter.snapshot.data && this.aRouter.snapshot.data.project) {
      this.projects = this.aRouter.snapshot.data.project;
      this.totalProjects = this.aRouter.snapshot.data.project.length;
    }
    const tabId = this.browserTabService.setTabIdFromUrl(window.location.href);
    chrome.tabs.sendMessage(+tabId, { method: 'getUrl' }, (currentPageUrl) => {
      if (currentPageUrl == null) {
        //if tab was close currentPageUrl is undefined
        return;
      }
      const domain = this.getDomainName(currentPageUrl);
      if (currentPageUrl == null || currentPageUrl == '') {
        // this scenario is possible when no page is open
        return;
      }
      const project = this.projects.find(x => {
        return x.projectDomain.find(x => x.domain == domain);
      });
      this.currentPageProject = project;
      this.cdr.detectChanges();
    });
  }

  startRecordingClick() {

    this.store.setProject(this.currentPageProject);
    this.ngZone.run(() => {
      this.router.navigate(['record-test', this.projects[0].id]);
    });
  }

  createNewProject() {
    this.websiteService.navigateNewProject();
  }
  // private setupPageScript() {
  //   this.sendMessageToBrowser('startBrowserActionMonitor');
  //   if (this.operatorsData.length === 0) {
  //     this.sendMessageToBrowser('getUrl');
  //   }
  //  // TODO add config
  //   this.sendMessageToBrowser('startXHRMonitor');
  // }

  viewProjects(): void {
    this.ngZone.run(() => {
      this.router.navigate(['projects']);
    });
  }
  getDomainName(url) {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
      return match[2];
    }
    else {
      return null;
    }
  }
}

