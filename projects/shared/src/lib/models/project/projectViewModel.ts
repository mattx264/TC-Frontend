import { ProjectDomainViewModel } from './projectDomainViewModel';

export interface ProjectViewModel {
    id: number;
    name: string;
    projectDomain:ProjectDomainViewModel[];
}