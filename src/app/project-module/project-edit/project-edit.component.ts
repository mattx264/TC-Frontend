import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectViewModel } from 'projects/tc-browser-recorder/src/app/ViewModels/projectViewModel';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {
  getProjectEndPoint = 'project';
  saveProjectEndPoint = 'project';
  formGroup: FormGroup;
  ProjectName = '';
  ProjectId = 0;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public emailChipColor: ThemePalette = 'primary';
  emailAddresses: string[] = [];
  selectable = true;
  addOnBlur = true;

  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private http: HttpClientService) {
                this.activatedRoute.parent.params.subscribe(x => this.ProjectId = x.id);
              }

  ngOnInit() {
    this.formGroup = this.buildForm();
    this.http.getGeneric<ProjectViewModel>(`${this.getProjectEndPoint}/${this.ProjectId}`).subscribe(x =>
      {
        x.userInProject.forEach(element => {
          this.emailAddresses.push(element.userEmail);
        });

        this.ProjectName = x.name;
        this.formGroup.get('name').setValue(x.name);
        this.formGroup.get('description').setValue(x.description);
        this.formGroup.get('usersEmail').setValue(this.emailAddresses);
        this.formGroup.get('domains').setValue(this.parseOutDomains(x.projectDomain));
        this.formGroup.get('id').setValue(x.id);
      });
  }
  buildForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      domains: ['', Validators.required],
      usersEmail: [''],
      id: [0],
    });
  }
  parseOutDomains(domains: Array<{ domain: string }>): string {
    let d = '';
    domains.forEach(x => d += (x.domain + ', '));

    if (d.length > 1) {
      d = d.substring(0, d.length - 2); // Remove trailing comma
    }

    return d;
  }
  save() {
    if (this.formGroup.invalid) {
      return;
    }

    this.http.put(this.saveProjectEndPoint, this.formGroup.getRawValue())
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
