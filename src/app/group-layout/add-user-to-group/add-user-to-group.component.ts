import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';

@Component({
  selector: 'app-add-user-to-group',
  templateUrl: './add-user-to-group.component.html',
  styleUrls: ['./add-user-to-group.component.scss']
})
export class AddUserToGroupComponent implements OnInit {
  formGroup: FormGroup;
  filterUsers: any[];
  selectedUsers: any[];
  constructor(private fb: FormBuilder, private httpClientService: HttpClientService) { }

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.formGroup = this.fb.group({
      email: ['', Validators.required],

    });
  }
  getUserNames() {
    return this.httpClientService.get('UserGroup/GetUsers')
      .toPromise()
      .then(data => { return data; });
  }

  filterCountryMultiple(event) {
    let query = event.query;
    this.httpClientService.get('UserGroup/GetUsers?searchName=' + query)
      .toPromise()
      .then((data: any[]) => {
        this.filterUsers = data;
      });
  }
  /**
   * 
   */
  addSelectedUsers() {
    this.httpClientService.post('UserGroup/AddUserByIds', this.filterUsers).subscribe((response: any) => {
     // this.ref.close();
    });
  }
  /*
  *Send email
   */
  addUser() {
    if (this.formGroup.invalid) {
      return;
    }
    this.httpClientService.post('UserGroup/AddUserByEmail', this.formGroup.getRawValue()).subscribe((response: any) => {
 //     this.ref.close();
    });
  }
}
