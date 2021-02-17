import { Injectable, InjectionToken } from '@angular/core';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';
import { ConfigProjectTestViewModel } from 'projects/shared/src/lib/viewModels/ConfigProjectTestViewModel';
import { ConfigProjectTestEnum } from 'projects/shared/src/lib/enums/config-project-test-enum';
import { ConfigProjectModel } from '../models/project/configProjectModel';
import { ConfigurationModel } from '../CommonDTO/ConfigurationModel';
import { ProjectTestConfigViewModel, TestInfoConfigClient } from '../../client-api';

@Injectable({
  providedIn: 'root'
})
export class ProjectConfigService {


  projectId: number;
  //configProject: ConfigProjectModel[] = [];
  testId: number;
  constructor(private httpClient: HttpClientService, private testInfoConfigClient: TestInfoConfigClient) {

  }
  getConfigsByTestId(testId: number): Promise<ConfigProjectModel[]> {
    return new Promise<ConfigProjectModel[]>(async (resolve) => {
      // if (this.testId === testId) {
      //   return resolve(this.configProject);
      // }
      this.testId = testId;
      this.projectId = null;

      Promise.all([
        this.testInfoConfigClient.get(testId).toPromise(),
        //this.httpClient.get('testInfoConfig/' + testId).toPromise(),
        this.httpClient.get('ConfigProjectTest').toPromise()
      ]).then(response => {
        let testConfig: ProjectTestConfigViewModel[] = response[0];
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
        let testConfig = response[0];
        let configs = response[1];
        const configProject = this.convert(configs, testConfig);
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
  private convert(configs, testConfigs) {
    let configProject: ConfigProjectModel[] = [];
    configs.forEach(config => {
      const testConfig = testConfigs.find(x => x.configProjectTestId == config.id);

      let value: any = testConfig == null ? config.defaultValue : testConfig.value;
      if (config.type === ConfigProjectTestEnum.Boolean) {
        value = value == 'false' ? false : value;
      }
      configProject.push({
        name: config.name,
        id: testConfig.id,
        projectId: config.id,
        configProjectTestId: config.id,
        description: config.description,
        value: value,
        valueType: config.type
      });
    });
    return configProject;
  }
}
