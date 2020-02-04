

 

    export interface UserModel { 
        id: number;
        guid: string;
        email: string;
        password: string;
        name: string;
        master: UserModel;
        isActive: boolean;
        createdBy: string;
        modifiedBy: string;
        dateAdded: Date;
        dateModified: Date;
    }

