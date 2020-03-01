import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';
import { StoreService } from '../services/store.service';
import { Route, Router } from '@angular/router';
import { SeleniumConverterService } from 'projects/shared/src/lib/services/selenium-converter.service';
import { SnackbarService } from 'projects/shared/src/lib/services/snackbar.service';

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
    private snackbarService:SnackbarService,
    private seleniumConverterService: SeleniumConverterService
  ) { }

  ngOnInit() {
    this.formGroup = this.buildForm();
    const project = this.storeService.getProject();
    if (project == null || project.id == null) {
      this.snackbarService.showError("Project is not selected, please select project first.");
      this.router.navigate(['/landing-page']);
    }
  }
  buildForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  cancelClick(){
    this.router.navigate(['record-test', this.storeService.getProject().id]);
  }
  saveTest() {
    if (this.formGroup.invalid) {
      return;
    }

    const data = this.formGroup.getRawValue();
    data.projectId = this.storeService.getProject().id;
    if (data.projectId == null) {
      console.error("PROJECT IS NOT SET!!");

    }
    data.seleniumCommands = this.seleniumConverterService.packageOperators(this.storeService.getOperatorsData());
    this.httpClient.post('projectTest', data).subscribe(response => {
      this.router.navigate(['/landing-page']);
      alert("Save successful");
    });
  }

}
