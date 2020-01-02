import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../../projects/shared/src/lib/services/http-client.service';
import { ProjectViewModel } from '../../../projects/shared/src/lib/viewModels/project-view-model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-project-layout',
  templateUrl: './project-layout.component.html',
  styleUrls: ['./project-layout.component.scss']
})
export class ProjectLayoutComponent implements OnInit {
  deleteProjectEndpoint: string = 'deleteProject';

  selection = new SelectionModel<ProjectViewModel>(true, []);

  projects: ProjectViewModel[];
  displayedColumns: string[] = ['checkbox','name','edit','send test'];
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

  deleteSelectedProjects(): void {
     let question: string = this.selection.selected.length == 1
      ? `Are you sure you want to delete the project: ${this.selection.selected[0].name}?`
      : "Are you sure you want to delete the selected projects?";
  
    let rsp = confirm(question);

    if(!rsp) return;

    let ids = this.selection.selected.map(x => x.id);
    
    this.httpClient.post(`project/${this.deleteProjectEndpoint}`, ids).subscribe(
      success => this.loadProjects(),
      error => alert(error.error));
  }

}
