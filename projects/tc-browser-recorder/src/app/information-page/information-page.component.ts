import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-information-page',
  templateUrl: './information-page.component.html',
  styleUrls: ['./information-page.component.scss']
})
export class InformationPageComponent implements OnInit {
  type: string;
  constructor(activeRouter: ActivatedRoute) {
    this.type = activeRouter.snapshot.paramMap.get('type');
  }

  ngOnInit() {
  }

}
