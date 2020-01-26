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
  
  viewProjects(): void {
    this.router.navigate(['projects']);
  }
}
