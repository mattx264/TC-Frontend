import { ConfigProjectTestEnum } from '../enums/config-project-test-enum';
export interface ConfigProjectTestViewModel {
    id: number;
    name: string;
    description: string;
    type: ConfigProjectTestEnum;
    defaultValue: string;
    isActive: boolean;
}

