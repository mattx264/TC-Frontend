import { Component, OnInit, Input } from '@angular/core';
import { ProjectViewModel } from '../../../../../projects/shared/src/client-api';

@Component({
  selector: 'app-project-sidebar',
  templateUrl: './project-sidebar.component.html',
  styleUrls: ['./project-sidebar.component.scss']
})
export class ProjectSidebarComponent implements OnInit {
  @Input() project: ProjectViewModel;
  constructor() { }

  ngOnInit() {
  }

}
