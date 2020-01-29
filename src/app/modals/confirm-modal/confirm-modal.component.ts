import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalData, ConfirmType } from '../modal-data';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
    ) { }

  public deleteSuccess = false;

  onNoClick(): boolean {
    this.dialogRef.close();
    return false;
  }

  confirm(): void {

    switch (this.data.confirmType) {
      case ConfirmType.DeleteProject:
        this.deleteSuccess = true;
        break;
    }
  }

}
