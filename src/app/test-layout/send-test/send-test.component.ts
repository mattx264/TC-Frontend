import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from '../../../../projects/shared/src/lib/services/http-client.service';
import { ProjectViewModel } from '../../../../projects/shared/src/lib/viewModels/project-view-model';
import { SzwagierModel } from '../../../../projects/shared/src/lib/models/szwagierModel';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectSzwagierDialogComponent } from './select-szwagier-dialog/select-szwagier-dialog.component';
import { SignalSzwagierService } from '../../../../projects/shared/src/lib/services/signalr/signal-szwagier.service';
import { SzwagierType } from '../../../../projects/shared/src/lib/models/SzwagierType';

@Component({
  selector: 'app-send-test',
  templateUrl: './send-test.component.html',
  styleUrls: ['./send-test.component.scss']
})
export class SendTestComponent implements OnInit {
  project: ProjectViewModel;
  szwagier: SzwagierModel;
  hubConnection: any;
  szwagiers: SzwagierModel[];
  projectTest: ProjectViewModel;
  displayedColumns: string[] = ['name', 'description', 'edit', 'send test'];

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private httpClient: HttpClientService,
    public dialog: MatDialog,
    private signalSzwagierService: SignalSzwagierService) { }

  ngOnInit() {
    const projectId = this.router.snapshot.paramMap.get('projectId');
    if (projectId === null) {
      this.route.navigate(["project"]);
    }
    this.httpClient.get('project/' + projectId).toPromise().then((project: ProjectViewModel) => {
      this.project = project;
    });
    this.httpClient.get('projectTest/' + projectId).toPromise().then((projectTest: ProjectViewModel) => {
      this.projectTest = projectTest;
    });
    this.hubConnection = this.signalSzwagierService.start();
    this.hubConnection.on('UpdateSzwagierList', (data: SzwagierModel[]) => {
      this.szwagiers = [];
      if (data == null) {
        return;
      }
      data.forEach(element => {
        if (element.szwagierType !== SzwagierType.SzwagierDashboard) {
          this.szwagiers.push(element);
        }
      });
    });
  }
  selectSzwagier() {
    const dialogRef = this.dialog.open(SelectSzwagierDialogComponent, {
      width: '250px',
      data: { szwagiers: this.szwagiers }
    });
    dialogRef.afterClosed().subscribe(connectionId => {
      this.szwagier = this.szwagiers.find(x => x.connectionId === connectionId);
    });
  }
  showCommands() {
    const dialogRef = this.dialog.open(SelectSzwagierDialogComponent, {
      width: '250px',
      data: { szwagiers: this.szwagiers }
    });
    dialogRef.afterClosed().subscribe(connectionId => {
      this.szwagier = this.szwagiers.find(x => x.connectionId === connectionId);
    });
  }
}
