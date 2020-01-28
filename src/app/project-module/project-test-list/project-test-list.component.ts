import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ProjectTestViewModel } from 'projects/shared/src/lib/viewModels/project-test-view-model';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-test-list',
  templateUrl: './project-test-list.component.html',
  styleUrls: ['./project-test-list.component.scss']
})
export class ProjectTestListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'runtest', 'editcommands', 'edit'];
  dataSource = new MatTableDataSource<ProjectTestViewModel>();
  projectId: number;
  constructor(private httpService: HttpClientService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.parent.params.subscribe(x => this.projectId = x.id);
  }

  ngOnInit() {
    this.httpService.get('projectTest/' + this.projectId).subscribe((data: ProjectTestViewModel[]) => {
      this.dataSource.data = data;
    });
  }

}
