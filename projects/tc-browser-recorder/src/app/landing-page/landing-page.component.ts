import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SzwagierModel } from '../../../../shared/src/lib/models/szwagierModel';
import { WebsiteService } from 'projects/shared/src/lib/services/website.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectViewModel } from 'projects/shared/src/lib/models/project/projectViewModel';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LandingPageComponent implements OnInit {
  totalProjects: number = 0;
  projects: Array<ProjectViewModel>;
  constructor(
    private router: Router,
    private aRouter: ActivatedRoute,
    private websiteService: WebsiteService
  ) { }

  ngOnInit() {
    if(this.aRouter.snapshot.data && this.aRouter.snapshot.data.project) {
      this.projects = this.aRouter.snapshot.data.project;
      this.totalProjects = this.aRouter.snapshot.data.project.length;
    }
  }

  startRecordingClick() {
    if(this.totalProjects > 1) {
      this.router.navigate(['projects']);
    } else {
      this.router.navigate(['record-test', this.projects[0].id]);
    }
  }

  createNewProject() {
    this.websiteService.navigateNewProject();
  }
  private setupPageScript() {
    this.sendMessageToBrowser('startBrowserActionMonitor');
    if (this.operatorsData.length === 0) {
      this.sendMessageToBrowser('getUrl');
    }
   // TODO add config
    this.sendMessageToBrowser('startXHRMonitor');
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

  viewProjects(): void {
    this.router.navigate(['projects']);
  }
}
