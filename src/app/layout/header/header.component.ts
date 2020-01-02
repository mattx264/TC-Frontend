import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../projects/shared/src/lib/services/auth/auth.service';
import { MatSidenavContainer, MatSidenav } from '@angular/material/sidenav';
import {EventEmitter } from '@angular/core'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sideToggle: EventEmitter<boolean> = new EventEmitter();


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleMenu(): void {
    this.sideToggle.emit(true);
  }
}
