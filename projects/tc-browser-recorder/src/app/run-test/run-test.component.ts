import { OperatorModelStatus } from './../../../../shared/src/lib/models/operatorModel';
import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SignalSzwagierService } from '../../../../shared/src/lib/services/signalr/signal-szwagier.service';
import { SzwagierModel } from '../../../../shared/src/lib/models/szwagierModel';
import { SzwagierType } from '../../../../shared/src/lib/models/SzwagierType';
import { StoreService } from '../services/store.service';
import { OperatorModel } from 'projects/shared/src/lib/models/operatorModel';
import { MatTableDataSource } from '@angular/material/table';
import { TestProgressMessage } from 'projects/shared/src/lib/models/TestProgressMessage';
import { OperatorService } from '../services/operator.service';

@Component({
  selector: 'app-run-test',
  templateUrl: './run-test.component.html',
  styleUrls: ['./run-test.component.scss']
})
export class RunTestComponent implements OnInit {
  hubConnection: signalR.HubConnection;
  commands: OperatorModelStatus[];

  dataSource: MatTableDataSource<OperatorModelStatus>;
  displayedColumns = ['action', 'path', 'value', 'progress'];


  constructor(private storeService: StoreService,
    signalSzwagierService: SignalSzwagierService,
    private operatorService: OperatorService,
    private cdr: ChangeDetectorRef) {
    this.hubConnection = signalSzwagierService.start();
  }
  ngOnInit() {
    this.commands = this.storeService.getOperatorsData();
    this.dataSource = new MatTableDataSource<OperatorModelStatus>(this.commands);

  }
  sendClick() {



    const operatorsData = this.storeService.getOperatorsData();
    var data = this.operatorService.packageOperators(operatorsData);
    const message = {
      ReceiverConnectionId: this.storeService.getSelectedBrowserEngine().connectionId,

      Commands: data
    }

    this.hubConnection.invoke('SendCommand', message);
    this.startTestProgressMonitor();
  }
  startTestProgressMonitor() {
    this.dataSource.data[0].status = 'inprogress';
    this.hubConnection.on('TestProgress', (testProgressMessage: TestProgressMessage) => {
      const test = this.dataSource.data.find(x => x.guid === testProgressMessage.commandTestGuid);
      if (testProgressMessage.isSuccesful) {
        test.status = 'done';
        const currentIndex = this.dataSource.data.findIndex(x => x.guid === testProgressMessage.commandTestGuid);
        this.dataSource.data[currentIndex+1].status = 'inprogress';
       
      } else {
        test.status = 'failed';
      }
      this.dataSource._updateChangeSubscription();
      this.cdr.detectChanges();
    });
  }


}
