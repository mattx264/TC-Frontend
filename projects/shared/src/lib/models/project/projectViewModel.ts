import { ProjectDomainViewModel } from './projectDomainViewModel';

export interface ProjectViewModel {
    id: number;
    name: string;
    projectDomain: Array<ProjectDomainViewModel>;
    dateModified: Date | string;
    modifiedBy: string;
    lastTestRunDate: Date | string;
}
