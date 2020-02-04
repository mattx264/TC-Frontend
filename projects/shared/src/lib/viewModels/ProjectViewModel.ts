

 

    export interface ProjectViewModel { 
        id: number;
        name: string;
        description: string;
        projectDomain: ProjectDomainViewModel[];
        userInProject: UserInProjectViewModel[];
    } 

    export interface ProjectCreateViewModel { 
        id: number;
        name: string;
        description: string;
        domains: string;
        usersEmail: string[];
    }

