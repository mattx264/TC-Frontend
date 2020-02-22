import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from '../ViewModels/Project';
//import { ProjectComponent } from 'src/app/project-module/project.component';
import { WebsiteService } from 'projects/shared/src/lib/services/website.service';
import { ProjectTest } from '../ViewModels/projectTests';
import { OperatorModel } from 'projects/shared/src/lib/models/operatorModel';
import { StoreService } from '../services/store.service';
import { BrowserTabService } from '../services/browser-tab.service';
import { ProjectViewModel } from 'projects/shared/src/lib/viewModels/ProjectViewModel';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  getProjectEndPoint = 'project';
  displayedColumns: string[] = ['name', 'projectDomain'];
  projectDataSource: MatTableDataSource<ProjectViewModel> = new MatTableDataSource<ProjectViewModel>();
  projects: ProjectViewModel[];
  testInfo: ProjectTest[];

  constructor(private browserTabService: BrowserTabService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private webService: WebsiteService,
    private ngZone: NgZone,
    private storeService: StoreService
  ) { }

  ngOnInit() {
    if (this.aRouter.snapshot.data && this.aRouter.snapshot.data.tests) {
      this.testInfo = this.aRouter.snapshot.data.tests;
      console.log(this.testInfo);
    }

    if (this.aRouter.snapshot.data && this.aRouter.snapshot.data.project) {
      this.projects = this.aRouter.snapshot.data.project;
      this.projects.forEach(x => x.tests = []);

      this.testInfo.forEach(y => {
        let indx = this.projects.findIndex(z => z.id == y.projectId);
        if (indx > -1) {
          if (!this.projects[indx].tests) {
            this.projects[indx].tests = [];
          }

          this.projects[indx].tests.push(y);
        }
      });


      this.projectDataSource.data = this.projects;
      console.log(this.projects);
    }
  }

  editProject(id: number): void {
    this.webService.navigateEditProject(id);
  }

  createNewTest(id: number, url: string): void {
    var proto = /^https?:\/\//i;
    if (!proto.test(url)) {
      url = `http://${url}`;
      console.log(url);
    }
    this.createNewTabAndNavigate(url, e => {
      const project=this.projects.find(x=>x.id==id)
      this.storeService.setProject(project);
      chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (tabId == e.id && changeInfo.status == "complete") {
          this.ngZone.run(() => {
            this.router.navigate(['record-test', id]);
          });           
        }
      });
    });
  }

  viewSavedTests(id: number): void {
    //TODO REMOVE ????
  }

  runTest(projectId: number, testId: number): void {
    //this.operatorService.packageOperators()
    this.storeService.setOperatorsData(this.getSeleniumCommands(projectId, testId));
    console.log(this.projects);
    this.router.navigate(['run-test']);
  }

  getSeleniumCommands(projectId: number, testId: number): Array<OperatorModel> {
    let tests = this.projects.filter(x => x.id == projectId)[0].tests
      .filter(y => y.id == testId)[0].commands;
    let commands: Array<OperatorModel> = [];
    tests.forEach(x => commands.push({
      action: x.operationId.toString(),
      path: x.webDriverOperationType.toString(),
      value: x.values,
      guid: x.guid
    }))

    console.log(commands);
    return commands;
  }

  private createNewTabAndNavigate(url: string, _callback: (t: chrome.tabs.Tab) => void) {
    chrome.tabs.create({ 'url': url }, tab => {
      this.browserTabService.setTabId(tab.id.toString());
      _callback(tab);
    });
  }
}
