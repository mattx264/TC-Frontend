import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientService } from '../../../../projects/shared/src/lib/services/http-client.service';

@Component({
  selector: 'app-create-new-group-dialog',
  templateUrl: './create-new-group-dialog.component.html',
  styleUrls: ['./create-new-group-dialog.component.scss']
})
export class CreateNewGroupDialogComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private httpClientService: HttpClientService) { }

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],

    });
  }
  creteNewGroup() {
    if(this.formGroup.invalid){
      return;
    }
    this.httpClientService.post('UserGroup',this.formGroup.getRawValue()).subscribe((response: any) => {
     
  //    this.ref.close();
    });
  }
}
