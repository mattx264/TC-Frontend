import { ProjectDomainViewModel } from '../models/project/projectDomainViewModel';
import { UserInProjectViewModel } from './UserInProjectViewModel'; 

    export interface ProjectViewModel { 
        id: number;
        name: string;
        description: string;
        projectDomain: ProjectDomainViewModel[];
        userInProject: UserInProjectViewModel[];
    } 

