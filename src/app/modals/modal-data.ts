export enum ConfirmType {
    DeleteProject
  }

export interface ModalData {
    confirmButtonText: string;
    cancelButtonText: string;
    headerQuestion: string;
    confirmQuestion: string;
    id: number;
    confirmType: ConfirmType;
}
