import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/layout.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { ProjectViewModel } from '../../../../projects/shared/src/client-api';

@Component({
  selector: 'app-project-wrapper',
  templateUrl: './project-wrapper.component.html',
  styleUrls: ['./project-wrapper.component.scss']
})
export class ProjectWrapperComponent implements OnInit {
  private: ProjectViewModel
  constructor(layoutService: LayoutService, router: ActivatedRoute, projectService: ProjectService) {
    const id = router.snapshot.paramMap.get('id');
    projectService.getProject(+id).then(data => {
      layoutService.showSidebar('project', data);
    });


  }

  ngOnInit() {
  }

}
