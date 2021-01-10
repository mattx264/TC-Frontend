import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';
import { ConfigProjectTestViewModel } from 'projects/shared/src/lib/viewModels/ConfigProjectTestViewModel';
import { ProjectTestConfigViewModel } from 'projects/shared/src/lib/viewModels/ProjectTestConfigViewModel';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigProjectTestEnum } from 'projects/shared/src/lib/enums/config-project-test-enum';
import { SnackbarService } from 'projects/shared/src/lib/services/snackbar.service';
import { ConfigProjectModel } from 'projects/shared/src/lib/models/project/configProjectModel';
import { ProjectConfigService } from 'projects/shared/src/lib/services/project-config.service';

@Component({
  selector: 'app-project-config',
  templateUrl: './project-config.component.html',
  styleUrls: ['./project-config.component.scss']
})
export class ProjectConfigComponent implements OnInit {
  projectConfig: ProjectTestConfigViewModel[];
  configs: ConfigProjectTestViewModel[];
  projectId: number;
  configProject: ConfigProjectModel[] = [];

  constructor(
    private httpClient: HttpClientService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbarService: SnackbarService,
    private projectConfigService: ProjectConfigService
  ) {
    this.activatedRoute.parent.params.subscribe(x => this.projectId = x.id);
  }

  ngOnInit() {
    this.projectConfigService.getConfigsByProjectId(this.projectId).then(data => {
      this.configProject = data;
    });

  }
  saveClick() {
    let data: ProjectTestConfigViewModel[] = [];
    this.configProject.forEach(config => {
      let value = config.value;
      if (config.valueType === ConfigProjectTestEnum.Boolean) {
        value = value == false ? 'false' : 'true';
      }
      data.push({
        configProjectTestId: config.configProjectTestId,
        id: config.id,
        projectId: config.projectId,
        value: value

      });
    });
    this.httpClient.post('ProjectTestConfig', data).subscribe(reponse => {
      this.snackbarService.showSnackbar("Save Successful");
      this.router.navigate(['/project', this.projectId, 'tests'])
    });
  }
}
