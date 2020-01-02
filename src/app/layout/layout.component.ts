import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Route, ActivatedRoute, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  showSidebar = true;
  showHeader = true;
  showFooter = false;
  constructor(private layoutService: LayoutService, private router: Router) { }

  ngOnInit() {
    this.layoutService.onUpdate.subscribe((data) => {
      if (data.sidebar === true) {
        this.showSidebar = true;
      } else {
        this.showSidebar = false;
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
}
