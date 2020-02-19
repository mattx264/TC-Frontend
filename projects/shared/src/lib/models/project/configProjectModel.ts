import { ConfigProjectTestEnum } from '../../enums/config-project-test-enum';

export interface ConfigProjectModel {
    id: number,
    configProjectTestId: number,
    projectId: number, name,
    description, value,
    valueType: ConfigProjectTestEnum
}