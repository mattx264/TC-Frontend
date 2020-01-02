import { Component, OnInit, ChangeDetectorRef, Output } from '@angular/core';
import * as signalR from '@microsoft/signalr';

import { SzwagierType, SzwagierTypeLabel } from '../../../projects/shared/src/lib/models/SzwagierType';
import { SzwagierModel } from '../../../projects/shared/src/lib/models/szwagierModel';
import { SignalSzwagierService } from 'projects/shared/src/lib/services/signalr/signal-szwagier.service';
import { EventEmitter } from '@angular/core';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-szwagier-dashboard',
  templateUrl: './szwagier-dashboard.component.html',
  styleUrls: ['./szwagier-dashboard.component.scss']
})
export class SzwagierDashboardComponent implements OnInit {
  @Output() connectionStatus: EventEmitter<string> = new EventEmitter(); // needs further implementation
  selection = new SelectionModel<SzwagierModel>(true, []);
  dataSource = new MatTableDataSource<SzwagierModel>();
  
  
  loading: boolean;
  
  displayedColumns: string[] = ['checkbox', 'name', 'szwagierType', 'connectionId', 'location', 'userId', 'RC', 'Send test'];
  szwagiers: SzwagierModel[];
  hubConnection: signalR.HubConnection;
  constructor( signalSzwagierService: SignalSzwagierService, private cd: ChangeDetectorRef) {
    this.hubConnection = signalSzwagierService.start();

    
  }
  ngOnInit() {
  
    this.hubConnection.on('UpdateSzwagierList', (data: SzwagierModel[]) => {
      this.szwagiers = [];
      if (data == null) {
        return;
      }
      data.forEach(element => {
        if (element.szwagierType !== SzwagierType.SzwagierDashboard) {
          element.szwagierTypeLabel=SzwagierTypeLabel.get(element.szwagierType);
          this.szwagiers.push(element);
        }
      });
      this.cd.detectChanges();

      this.dataSource.data = this.szwagiers;
      // console.log(this.szwagiers);
    });
  }
  sendTestClick() {
    //this.hubConnection.invoke('SendTriggerTest', 1);
  }

  

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
