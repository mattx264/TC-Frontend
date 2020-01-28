import { Project } from './Project';
import { SeleniumCommand } from './seleniumCommand';

export interface TestInfo {
    id: number;
    isActive: boolean;
    createdBy: string;
    modifiedBy: string;
    dateAdded: Date;
    dateModified: Date;
    projectId: number;
    project: Project;
    seleniumCommands: Array<SeleniumCommand>;
    testRunHistory: any;
    name: string;
    description: string;
}
