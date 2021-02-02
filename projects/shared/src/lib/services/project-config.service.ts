import { Injectable } from '@angular/core';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';
import { ConfigProjectTestViewModel } from 'projects/shared/src/lib/viewModels/ConfigProjectTestViewModel';
import { ConfigProjectTestEnum } from 'projects/shared/src/lib/enums/config-project-test-enum';
import { ConfigProjectModel } from '../models/project/configProjectModel';
import { ConfigurationModel } from '../CommonDTO/ConfigurationModel';
import { TestInfoConfigViewModel } from '../viewModels/TestInfoConfigViewModel';

@Injectable({
  providedIn: 'root'
})
export class ProjectConfigService {


  projectId: number;
  //configProject: ConfigProjectModel[] = [];
  testId: number;
  constructor(private httpClient: HttpClientService) {

  }
  getConfigsByTestId(testId: number): Promise<ConfigProjectModel[]> {
    return new Promise<ConfigProjectModel[]>((resolve) => {
      // if (this.testId === testId) {
      //   return resolve(this.configProject);
      // }
      this.testId = testId;
      this.projectId = null;
      Promise.all([
        this.httpClient.get('testInfoConfig/' + testId).toPromise(),
        this.httpClient.get('ConfigProjectTest').toPromise()
      ]).then(response => {
        let testConfig:TestInfoConfigViewModel[] = response[0];
        let configs = response[1];
        
        const configProject = this.convert(configs, testConfig);
        resolve(configProject);
      });
    });
  }
  getConfigurationModel(configProject: ConfigProjectModel[]): ConfigurationModel[] {
    let configurationModel: ConfigurationModel[] = []
    configProject.forEach(item => {
      configurationModel.push({
        id: item.id,
        configProjectTestId: item.configProjectTestId,
        description: item.description,
        name: item.name,
        projectId: item.projectId,
        value: item.value.toString()
      });
    });
    return configurationModel;
  }
  getConfigsByProjectId(projectId: number): Promise<ConfigProjectModel[]> {
    return new Promise<ConfigProjectModel[]>((resolve) => {
      // if (this.projectId === projectId) {
      //   return resolve(this.configProject);
      // }
      this.projectId = projectId;
      this.testId = null;
      Promise.all([
        this.httpClient.get('ProjectTestConfig/' + projectId).toPromise(),
        this.httpClient.get('ConfigProjectTest').toPromise()
      ]).then(response => {
        let projectConfig = response[0];
        let configs = response[1];
        const configProject = this.convert(configs, projectConfig);
        resolve(configProject);
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
  private convert(configs, projectConfig) {
    let configProject:ConfigProjectModel[] = [];
    configs.forEach(e => {
      const projectConfigTest = projectConfig.find(x => x.configProjectTestId == e.id);
      let value: any = projectConfigTest == null ? e.defaultValue : projectConfigTest.value;
      if (e.type === ConfigProjectTestEnum.Boolean) {
        value = value == 'false' ? false : value;
      }
      configProject.push({
        name: e.name,
        id: projectConfigTest.id,
        projectId: projectConfigTest.projectId,
        configProjectTestId: e.id,
        description: e.description,
        value: value,
        valueType: e.type
      });
    });
    return configProject;
  }
}
