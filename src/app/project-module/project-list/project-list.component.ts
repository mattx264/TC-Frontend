import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';
import { ConfirmType } from 'src/app/modals/modal-data';
import { ProjectViewModel } from 'projects/shared/src/lib/viewModels/ProjectViewModel';
import { ProjectDetailsViewModel } from 'projects/shared/src/lib/viewModels/ProjectDetailsViewModel';

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
    this.httpClient.get(this.getProjectDetailsEndPoint).toPromise().then((projects: ProjectDetailsViewModel[]) => {
      this.projects = projects;
      this.dataSource.data = this.projects;
    });
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
