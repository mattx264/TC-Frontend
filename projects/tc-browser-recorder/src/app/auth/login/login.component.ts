import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../../../shared/src/lib/services/auth/auth.service';
import { HttpClientService } from '../../../../../shared/src/lib/services/http-client.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  returnUrl: any;
  unathorized = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private httpClientService: HttpClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.buildForm();
    this.authService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }
  buildForm() {
    this.formGroup = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required],
    });
  }
  login() {

    this.unathorized = false;
    this.httpClientService.post('User/CreateToken', this.formGroup.getRawValue()).subscribe((response: any) => {
      this.authService.setsCurrentUser({
        firstName: response.firstName,
        lastName: response.lastName,
        token: response.token,
      });
      this.router.navigate([this.returnUrl]);
    }, (error: HttpErrorResponse) => {
      if (error.status === 401) {
        this.unathorized = true;
      }
    });
  }
  googleLoginClick() {
    this.authService.doGoogleLogin();
  }
}
