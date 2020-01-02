import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SzwagierModel } from '../../../../../projects/shared/src/lib/models/szwagierModel';

@Component({
  selector: 'app-select-szwagier-dialog',
  templateUrl: './select-szwagier-dialog.component.html',
  styleUrls: ['./select-szwagier-dialog.component.scss']
})
export class SelectSzwagierDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SelectSzwagierDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SzwagierModel[]) { }

  ngOnInit() {

  }
  selected(connetionId: string) {
    this.dialogRef.close(connetionId);
  }
}
