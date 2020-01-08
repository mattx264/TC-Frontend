import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/layout.service';
import { ProjectViewModel } from 'projects/shared/src/lib/models/project/projectViewModel';
import {  ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {
  private: ProjectViewModel
  constructor(layoutService: LayoutService, router:  ActivatedRoute) {
    const id = router.snapshot.paramMap.get('id');
    layoutService.showSidebar('project', {id:id});

  }

  ngOnInit() {
  }

}
