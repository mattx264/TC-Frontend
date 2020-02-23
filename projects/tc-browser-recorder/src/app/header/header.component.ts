import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StoreService } from '../services/store.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/src/lib/services/auth/auth.service';
import { SzwagierModel } from 'projects/shared/src/lib/models/szwagierModel';
import { ProjectViewModel } from 'projects/shared/src/lib/viewModels/ProjectViewModel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderRecorderComponent implements OnInit {
  project: ProjectViewModel;
  szwagierModel: SzwagierModel;
  loggedInUser: string;

  constructor(
    private storeService: StoreService,
    private authService: AuthService,
    private router: Router,
    private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.storeService.state$.subscribe((x: ProjectViewModel) => {
      this.project = x;
      this.ref.detectChanges();
    });

    var user = this.authService.getCurrentUser();
    this.loggedInUser = `${user.firstName} ${user.lastName}`;
    console.log(this.loggedInUser);
    this.storeService.selectedBrowserEngine$.subscribe((x: SzwagierModel) => {
      this.szwagierModel = x;
      this.ref.detectChanges();
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
