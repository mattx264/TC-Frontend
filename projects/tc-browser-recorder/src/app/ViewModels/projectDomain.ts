import { Project } from './Project';

export interface ProjectDomain {
    id: number;
    domain: string;
    projectId: number;
    project: Project;
    isActive: boolean;
    createdBy: string;
    dateAdded: Date;
    dateModified: Date;
}
