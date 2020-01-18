import { IEntity } from './entity';
import { ProjectDomain } from './projectDomain';

export interface Project {
    id: number;
    isActive: boolean;
    createdBy: string;
    modifiedBy: string;
    dateAdded: Date;
    dateModified: Date;
    name: string;
    description: string;
    projectDomains: Array<ProjectDomain>;
}
