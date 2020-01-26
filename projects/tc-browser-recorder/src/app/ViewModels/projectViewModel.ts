import { ProjectDomainViewModel } from './projectDomainViewModel';
import { UserInProjectViewModel } from './userInProjectViewModel';
import { ProjectTest } from './projectTests';

export interface ProjectViewModel {
    id: number;
    name: string;
    description: string;
    projectDomain: Array<ProjectDomainViewModel>;
    userInProject: Array<UserInProjectViewModel>;
    tests?: Array<ProjectTest>
}
