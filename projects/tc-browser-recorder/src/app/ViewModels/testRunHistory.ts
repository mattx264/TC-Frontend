import { TestInfo } from './testInfo';

export interface TestRunHistory {
    id: number;
    isActive: boolean;
    createdBy: string;
    modifiedBy: string;
    dateAdded: Date;
    dateModified: Date;
    testInfoId: number;
    testInfo: TestInfo;
    testRunResults: any; // need to fix
}
