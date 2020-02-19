import { Injectable } from '@angular/core';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';
import { ConfigProjectTestViewModel } from 'projects/shared/src/lib/viewModels/ConfigProjectTestViewModel';
import { ConfigProjectTestEnum } from 'projects/shared/src/lib/enums/config-project-test-enum';
import { ConfigProjectModel } from '../models/project/configProjectModel';

@Injectable({
  providedIn: 'root'
})
export class ProjectConfigService {

  projectId: number;
  configProject: ConfigProjectModel[] = [];
  constructor(private httpClient: HttpClientService) {

  }
  getConfigsByTestId(testId: number): Promise<ConfigProjectModel[]> {
    return new Promise<ConfigProjectModel[]>((resolve) => {
      Promise.all([
        this.httpClient.get('testInfoConfig/' + testId).toPromise(),
        this.httpClient.get('ConfigProjectTest').toPromise()
      ]).then(response => {
        let testConfig = response[0];
        let configs = response[1];
        this.configProject = this.convert(configs,testConfig);
        resolve(this.configProject);
      });
    });
  }
  getConfigsByProjectId(projectId: number): Promise<ConfigProjectModel[]> {
    return new Promise<ConfigProjectModel[]>((resolve) => {
      if (this.projectId === projectId) {
        return resolve(this.configProject);
      }
      this.projectId = projectId;
      Promise.all([
        this.httpClient.get('ProjectTestConfig/' + projectId).toPromise(),
        this.httpClient.get('ConfigProjectTest').toPromise()
      ]).then(response => {
        let projectConfig = response[0];
        let configs = response[1];
        this.configProject = this.convert(configs,projectConfig);
        resolve(this.configProject);
      });
    });
  }
  getConfigById(projectId: number, configId: number) {
    return new Promise<string | boolean>((resolve) => {
      this.getConfigsByProjectId(projectId).then((result: ConfigProjectModel[]) => {
        const projectConfigModel = result.find(x => x.configProjectTestId == configId);
        resolve(projectConfigModel.value)
      });
    });
  }
  getConfigByName(projectId: number, name: string) {
    return new Promise<string | boolean>((resolve) => {
      this.getConfigsByProjectId(projectId).then((result: ConfigProjectModel[]) => {
        const projectConfigModel = result.find(x => x.name == name);
        resolve(projectConfigModel.value)
      });
    });
  }
  private convert(configs,projectConfig){
    let configProject = [];
    configs.forEach(e => {
      const configProjectTest = projectConfig.find(x => x.configProjectTestId == e.id);
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
    return configProject;
  }
}
