import { ProjectDomainViewModel } from '../models/project/projectDomainViewModel';
import { UserInProjectViewModel } from './UserInProjectViewModel';

 
export interface ProjectDetailsViewModel { 
  id: number;
  name: string;
  description: string;
  projectDomain: ProjectDomainViewModel[];
  userInProject: UserInProjectViewModel[];
  dateModified: Date;
  modifiedBy: string;
  lastTestRunDate: Date;
}

