import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ThemePalette, ErrorStateMatcher } from '@angular/material/core';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';
import { FormValidatorsService } from 'src/app/services/form-validators.service';



@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public emailChipColor: ThemePalette = 'primary';

  public formGroup: FormGroup;
  saveProjectEndPoint = 'project';
  emailAddresses: string[] = [];
  selectable = true;
  addOnBlur = true;


  constructor(private fb: FormBuilder,
    private router: Router,
    private http: HttpClientService,
    private formValidatorsService: FormValidatorsService) { }

  ngOnInit() {
    this.formGroup = this.buildForm();

    this.formGroup.controls.usersEmail.setValue(this.emailAddresses);
  }

  buildForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      domains: ['', Validators.required],
      usersEmail: [this.emailAddresses, [this.formValidatorsService.validateEmails]]
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
