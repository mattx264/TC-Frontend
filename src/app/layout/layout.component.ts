import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd, Route, ActivatedRoute, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LayoutService } from './layout.service';
import { MatSidenav } from '@angular/material';
import { HeaderComponent } from 'projects/tc-browser-recorder/src/app/header/header.component';
import { ProjectViewModel } from 'projects/shared/src/lib/models/project/projectViewModel';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  showSidebar = true;
  showHeader = true;
  showFooter = false;
  sidebarName: string;
  project: ProjectViewModel;
  @ViewChild('header', { static: false }) header: HeaderComponent;
  @ViewChild('sideNav', { static: false }) sideNav: MatSidenav;
  constructor(private layoutService: LayoutService, private router: Router) {
    this.sidebarName = "sidebar"
  }

  ngOnInit() {

    this.layoutService.onUpdate.subscribe((data) => {
      this.sidebarName = data.sidebarName;
      if(this.sidebarName =='project'){
        this.project=data.metadata;
      }
      if (data.sidebar === true) {
        this.showSidebar = true;
        this.sideNav.open()
      } else {
        this.showSidebar = false;
        this.sideNav.close();
      }
      if (data.header === true) {
        this.showHeader = true;
      } else {
        this.showHeader = false;
      }
      if (data.footer === true) {
        this.showFooter = true;
      } else {
        this.showFooter = false;
      }
    });
    this.router.events
      // NavigationStart have to be on start because this.layoutService.onUpdate is trigger later
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(event => {
        //set show after page is changed
        this.layoutService.resetValues();
        this.showSidebar = true;
        this.showHeader = true;
        this.showFooter = true;
      });

  }
  toggleSidebar(event) {
    this.sideNav.toggle()
  }
}
