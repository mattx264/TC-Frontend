import { Injectable, InjectionToken } from '@angular/core';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';
import { ConfigProjectTestViewModel } from 'projects/shared/src/lib/viewModels/ConfigProjectTestViewModel';
import { ConfigProjectTestEnum } from 'projects/shared/src/lib/enums/config-project-test-enum';
import { ConfigProjectModel } from '../models/project/configProjectModel';
import { ConfigurationModel } from '../CommonDTO/ConfigurationModel';
import { ProjectTestConfigClient, ProjectTestConfigViewModel, TestInfoConfigClient, TestInfoConfigViewModel } from '../../client-api';

@Injectable({
  providedIn: 'root'
})
export class ProjectConfigService {


  projectId: number;
  //configProject: ConfigProjectModel[] = [];
  testId: number;
  constructor(
    private httpClient: HttpClientService,
    private testInfoConfigClient: TestInfoConfigClient,
    private projectTestConfigClient: ProjectTestConfigClient
  ) {

  }
  getConfigsByTestId(testInfoId: number): Promise<ConfigProjectModel[]> {
    return new Promise<ConfigProjectModel[]>(async (resolve) => {
      // if (this.testId === testId) {
      //   return resolve(this.configProject);
      // }
      this.projectId = null;

      Promise.all([
        this.testInfoConfigClient.get(testInfoId).toPromise(),
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
        this.projectTestConfigClient.get(this.projectId).toPromise(),
        this.httpClient.get('ConfigProjectTest').toPromise()
      ]).then(response => {
        let projectConfig = response[0];
        let configs = response[1];
        const configProject = this.convertProject(configs, projectConfig);
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
  private convert(configs, testConfigs: TestInfoConfigViewModel[]) {
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
        projectId: -1,
        testInfoId: testConfig.testInfoId,
        configProjectTestId: config.id,
        description: config.description,
        value: value,
        valueType: config.type
      });
    });
    return configProject;
  }

  private convertProject(configs, projectConfigs: ProjectTestConfigViewModel[]) {
    let configProject: ConfigProjectModel[] = [];
    configs.forEach(config => {
      const projectConfig = projectConfigs.find(x => x.configProjectTestId == config.id);

      let value: any = projectConfig == null ? config.defaultValue : projectConfig.value;
      if (config.type === ConfigProjectTestEnum.Boolean) {
        value = value == 'false' ? false : value;
      }
      configProject.push({
        name: config.name,
        id: projectConfig.id,
        projectId: projectConfig.projectId,
        configProjectTestId: config.id,
        description: config.description,
        value: value,
        valueType: config.type
      });
    });
    return configProject;
  }
}
