export interface IEntity {
    id: number;
    isActive: boolean;
    createdBy: string;
    modifiedBy: string;
    dateAdded: Date;
    dateModified: Date;
}