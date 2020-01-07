import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { ProjectViewModel } from 'projects/shared/src/lib/models/project/projectViewModel';
import { MatTableDataSource } from '@angular/material';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

 
  selection = new SelectionModel<ProjectViewModel>(true, []);

  projects: ProjectViewModel[];
  displayedColumns: string[] = ['name','select'];
  dataSource = new MatTableDataSource<ProjectViewModel>();
  constructor(private httpClient: HttpClientService) { }

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects(): void {
    this.httpClient.get('project').toPromise().then((projects: ProjectViewModel[]) => {
      this.projects = projects;
      this.dataSource.data = this.projects;
    });
  }
}
