import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router, ActivatedRoute } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { FormValidatorsService } from 'src/app/services/form-validators.service';
import { ProjectClient, ProjectDomainViewModel, ProjectViewModel } from '../../../../../projects/shared/src/client-api';

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
  projectId = 0;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public emailChipColor: ThemePalette = 'primary';
  emailAddresses: string[] = [];
  newEmailAddresses: string[] = [];
  selectable = true;
  addOnBlur = true;

  constructor(private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private projectClient: ProjectClient,
    private formValidatorsService: FormValidatorsService) {
    this.activatedRoute.parent.params.subscribe(x => this.projectId = x.id);
  }

  async ngOnInit() {
    this.formGroup = this.buildForm();
    let project = await this.projectClient.getProject(this.projectId).toPromise();

    project.userInProject.forEach(element => {
      this.emailAddresses.push(element.userEmail);
    });

    this.ProjectName = project.name;
    this.formGroup.get('name').setValue(project.name);
    this.formGroup.get('description').setValue(project.description);
    // this.formGroup.get('usersEmail').setValue(this.emailAddresses);
    this.formGroup.get('domains').setValue(this.parseOutDomains(project.projectDomain));
    this.formGroup.get('id').setValue(project.id);

  }
  buildForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      domains: ['', Validators.required],
      usersEmail: [this.newEmailAddresses, [this.formValidatorsService.validateEmails]],
      id: [0],
    });
  }
  parseOutDomains(domains: ProjectDomainViewModel[]): string {
    let d = '';
    domains.forEach(x => d += (x.domain + ', '));

    if (d.length > 1) {
      d = d.substring(0, d.length - 2); // Remove trailing comma
    }

    return d;
  }
  async save() {
    if (this.formGroup.invalid) {
      return;
    }
    this.formGroup.get('usersEmail').setValue((this.formGroup.get('usersEmail').value as string[]).concat(this.emailAddresses));
    await this.projectClient.put(this.formGroup.getRawValue()).toPromise();
    this.router.navigate(['project']);  
  }

  removeEmail(address: string): void {
    const indx = this.newEmailAddresses.indexOf(address);
    if (indx > -1) {
      this.newEmailAddresses.splice(indx, 1);
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
        const indx = this.newEmailAddresses.findIndex(x => x === value.trim());
        if (indx !== -1) {
          this.newEmailAddresses.splice(indx, 1);
        }
      }
    } else {
      this.formGroup.controls.usersEmail.updateValueAndValidity();
    }
  }
}
