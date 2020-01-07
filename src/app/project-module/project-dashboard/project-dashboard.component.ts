import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/layout.service';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {

  constructor(layoutService: LayoutService) {
    layoutService.showSidebar();
  }

  ngOnInit() {
  }

}
