import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TestInfoViewModel } from 'projects/shared/src/lib/viewModels/testInfo-ViewModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-test-edit',
  templateUrl: './project-test-edit.component.html',
  styleUrls: ['./project-test-edit.component.scss']
})
export class ProjectTestEditComponent implements OnInit {
  testId: number;
  testInfo: TestInfoViewModel;
  formGroup: FormGroup;
  projectId: number;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpClientService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.activatedRoute.parent.params.subscribe(x => {
      this.projectId = +x.id;
    });
    this.testId = +this.activatedRoute.snapshot.paramMap.get('testid');
  }

  ngOnInit() {

    this.httpService.get('testInfo/' + this.testId).subscribe((data: TestInfoViewModel) => {
      this.testInfo = data;
      this.formGroup = this.buildForm(data);
    });

  }
  buildForm(data: TestInfoViewModel): FormGroup {
    return this.fb.group({
      name: [data.name, Validators.required],
      description: [data.description, Validators.required]
    });
  }
  save() {
    if (this.formGroup.invalid) {
      return;
    }
    this.testInfo.name = this.formGroup.get('name').value;
    this.testInfo.description = this.formGroup.get('description').value;
    this.httpService.put('testInfo', this.testInfo)
      .subscribe(
        r => this.router.navigate(['/project', this.projectId, 'tests']),
        e => alert(e.error)
      );
  }
}
