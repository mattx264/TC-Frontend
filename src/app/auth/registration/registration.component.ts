import { EmailExistsValidator } from './../validators/email-exists-validator';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from '../../layout/layout.service';
import { AuthService } from '../../../../projects/shared/src/lib/services/auth/auth.service';
import { HttpClientService } from '../../../../projects/shared/src/lib/services/http-client.service';
import { FormValidatorsService } from 'src/app/services/form-validators.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private httpClientService: HttpClientService,
    private router: Router,
    layoutService: LayoutService,
    private formValidators: FormValidatorsService
  ) {
    layoutService.hideSidebarHeader();
  }

  ngOnInit() {
    this.buildForm();
    this.authService.logout();
  }

  buildForm() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, this.formValidators.validateEmail]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  registerNewUser() {
    if (this.formGroup.invalid) {
      return;
    }
    const userToCreate = this.formGroup.value;
    userToCreate.timeZone = new Date();

    this.httpClientService.post('user/Registration', userToCreate).subscribe((response: any) => {
      this.router.navigate(['login']);
    });
  }

}
