import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';
import { ConfigProjectTestViewModel } from 'projects/shared/src/lib/viewModels/ConfigProjectTestViewModel';
import { ProjectTestConfigViewModel } from 'projects/shared/src/lib/viewModels/ProjectTestConfigViewModel';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigProjectTestEnum } from 'projects/shared/src/lib/enums/config-project-test-enum';
import { SnackbarService } from 'projects/shared/src/lib/services/snackbar.service';

@Component({
  selector: 'app-project-config',
  templateUrl: './project-config.component.html',
  styleUrls: ['./project-config.component.scss']
})
export class ProjectConfigComponent implements OnInit {
  projectConfig: ProjectTestConfigViewModel[];
  configs: ConfigProjectTestViewModel[];
  projectId: number;
  configProject: { id: number, configProjectTestId: number, projectId: number, name, description, value, valueType: ConfigProjectTestEnum }[] = [];

  constructor(
    private httpClient: HttpClientService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbarService: SnackbarService
  ) {
    this.activatedRoute.parent.params.subscribe(x => this.projectId = x.id);
  }

  ngOnInit() {
    Promise.all([
      this.httpClient.get('ProjectTestConfig/' + this.projectId).toPromise(),
      this.httpClient.get('ConfigProjectTest').toPromise()
    ]).then(response => {
      this.projectConfig = response[0];
      this.configs = response[1];
      this.configProject = [];
      this.configs.forEach(e => {
        const configProjectTest = this.projectConfig.find(x => x.configProjectTestId == e.id);
        let value: any = configProjectTest == null ? e.defaultValue : configProjectTest.value;
        if (e.type === ConfigProjectTestEnum.Boolean) {
            value = value == 'false' ? false : value;
        }
        this.configProject.push({
          name: e.name,
          id: configProjectTest.id,
          projectId: configProjectTest.projectId,
          configProjectTestId: e.id,
          description: e.description,
          value: value,
          valueType: e.type
        });
      });
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
      this.router.navigate(['project'])
    });
  }
}
