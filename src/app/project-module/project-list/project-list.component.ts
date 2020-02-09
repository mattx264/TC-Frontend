import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { ProjectViewModel } from 'projects/shared/src/lib/models/project/projectViewModel';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';
import { isDate } from 'util';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';
import { ConfirmType } from 'src/app/modals/modal-data';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  deleteProjectEndPoint = 'project/deleteProject';
  getProjectDetailsEndPoint = 'project/getProjectDetails';
  abrMonths: Array<string> = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
    'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  selection = new SelectionModel<ProjectViewModel>(true, []);

  projects: ProjectViewModel[];
  displayedColumns: string[] = ['name', 'dateModified', 'modifiedBy', 'lastTestRunDate'];
  dataSource = new MatTableDataSource<ProjectViewModel>();
  constructor(private httpClient: HttpClientService,
              public dialog: MatDialog,
              ) { }

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects(): void {
    this.httpClient.get(this.getProjectDetailsEndPoint).toPromise().then((projects: ProjectViewModel[]) => {
      this.projects = projects.map(x => {
        const pvm: ProjectViewModel = {
          id: x.id,
          name: x.name,
          projectDomain: x.projectDomain,
          dateModified: this.formatDateTime(new Date(x.dateModified)),
          modifiedBy: x.modifiedBy,
          lastTestRunDate: this.formatDateTime(new Date(x.lastTestRunDate))
        };

        return pvm;
      });
      this.dataSource.data = this.projects;
    });
  }



  formatDateTime(d: Date): string {
    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    let hour = d.getHours();
    let min = d.getMinutes().toString();

    if (+min < 10) {
      min = `0${min}`;
    }

    let ampm = 'AM';
    if (hour > 12) {
        hour -= 12;
        ampm = 'PM';
    } else if (hour === 0) {
      hour = 12;
    }

    return `${this.abrMonths[month]} ${day}, ${year} ${hour}:${min} ${ampm}`;
  }



  deleteProject(projectId: number): void {
    const projectName = this.dataSource.data.filter(x => x.id === projectId)[0].name;

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '450px',
      data: {
        headerQuestion: 'Are you sure?',
        confirmQuestion: `Are you sure you want to delete the following project: <b>${projectName}</b>?`,
        confirmButtonText: 'Yes, Delete',
        cancelButtonText: 'Cancel',
        id: projectId,
        confirmType: ConfirmType.DeleteProject
      }
    });


    dialogRef.beforeClosed().subscribe(r => {
      if (dialogRef.componentInstance.deleteSuccess === true) {
        this.httpClient.post(this.deleteProjectEndPoint, [projectId]).toPromise().then(
          success => console.log('deleted'),
          error => console.log(error)
        );

        const indx = this.dataSource.data.findIndex(x => x.id === projectId);
        console.log(indx);
        this.dataSource.data.splice(indx, 1);
        this.dataSource._updateChangeSubscription();
      }
    });
  }
}
