import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';
import { StoreService } from '../services/store.service';
import { Route, Router } from '@angular/router';
import { OperatorService } from '../services/operator.service';

@Component({
  selector: 'app-save-test',
  templateUrl: './save-test.component.html',
  styleUrls: ['./save-test.component.scss']
})
export class SaveTestComponent implements OnInit {
  formGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClientService,
    private storeService: StoreService,
    private router: Router,
    private operatorService: OperatorService
  ) { }

  ngOnInit() {
    this.formGroup = this.buildForm();
  }
  buildForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  saveTest() {
    if (this.formGroup.invalid) {
      return;
    }
    const data = this.formGroup.getRawValue();
    data.projectId = this.storeService.getProject().id;

    data.seleniumCommands = this.operatorService.packageOperators(this.storeService.getOperatorsData());
    this.httpClient.post('projectTest', data).subscribe(response => {
      this.router.navigate(['/landing-page']);
        alert("Save successful");
    });
  }

}
