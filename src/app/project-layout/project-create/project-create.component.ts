import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClientService } from '../../../../projects/shared/src/lib/services/http-client.service';
import { Router } from '@angular/router';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {ThemePalette} from '@angular/material/core';

export class CustomValidators {

  static validateEmails(c: FormControl) {
    // tslint:disable-next-line:max-line-length
    const EMAIL_REGEXP = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    let inValid = null;
    c.value.forEach((item) => {
      if (!EMAIL_REGEXP.test(item)) {
        inValid = {email: true};
      }
    });
    return  inValid;
  }
}


@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public emailChipColor: ThemePalette = 'primary';

  public formGroup: FormGroup;
  saveProjectEndPoint: string = 'project';
  emailAddresses: string[] = [];
  selectable: boolean = true;
  addOnBlur: boolean = true;

  constructor(private fb: FormBuilder, 
    private router: Router,
    private http: HttpClientService) { }

    
  ngOnInit() {
    this.formGroup = this.buildForm();
    this.formGroup.controls['usersEmail'].setValue(this.emailAddresses);
  }

  buildForm(): FormGroup {
    return this.fb.group({
      'name': ['', Validators.required],
      'description': ['', Validators.required],
      'domains': ['', Validators.required],
      'usersEmail': [this.emailAddresses,  [Validators.required, CustomValidators.validateEmails]]
    });
  }

  save() {
    if (this.formGroup.invalid) {
      return;
    }

    this.http.post(this.saveProjectEndPoint, this.formGroup.getRawValue())
      .subscribe(
        r => this.router.navigate(['project']),
        e => alert(e.error)
    );
  }

  removeEmail(address: string): void {
    const indx = this.emailAddresses.indexOf(address);
    if (indx > -1) {
      this.emailAddresses.splice(indx, 1);
    }

    this.formGroup.controls.usersEmail.updateValueAndValidity();
    this.formGroup.controls.usersEmail.markAsDirty();
  }

  addEmail(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

  //  NEED TO FIX VALIDATORS
    if ((value.trim() !== '')) {
      this.formGroup.controls.usersEmail.setErrors(null);
      const tempEmails = this.formGroup.controls.usersEmail.value;
      tempEmails.push(value.trim());
      this.formGroup.controls.usersEmail.setValue(tempEmails);

      if (this.formGroup.controls.usersEmail.valid) {
        this.formGroup.controls.usersEmail.markAsDirty();
        input.value = '';
      } else {
        const indx = this.emailAddresses.findIndex(x => x === value.trim());
        if (indx !== -1) {
          this.emailAddresses.splice(indx, 1);
        }
      }
    } else {
      this.formGroup.controls.usersEmail.updateValueAndValidity();
    }
  }
}
