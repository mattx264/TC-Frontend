import { Component, OnInit, Input } from '@angular/core';
import { LayoutService } from '../layout/layout.service';
import { __importDefault } from 'tslib';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  @Input() companyName = 'Testing Center';
  dataToExport = { country: 'USA', companyName: 'TestingCenter', email: 'dd@dd', isVertical: true};

  constructor(private layoutService: LayoutService) {
   }

  ngOnInit() {
    this.layoutService.hideSidebarHeader();
  }

}
