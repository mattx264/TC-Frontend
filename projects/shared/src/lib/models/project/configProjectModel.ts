import { ConfigProjectTestEnum } from '../../enums/config-project-test-enum';

export interface ConfigProjectModel {
    id: number,
    configProjectTestId: number,
    testInfoId?:number,
    projectId: number,
    name: string,
    description: string,
    value: any,
    valueType: ConfigProjectTestEnum
}
