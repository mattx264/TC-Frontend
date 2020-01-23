import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectTestViewModel } from 'projects/shared/src/lib/viewModels/project-test-view-model';

@Component({
  selector: 'app-project-test',
  templateUrl: './project-test.component.html',
  styleUrls: ['./project-test.component.scss']
})
export class ProjectTestComponent implements OnInit {
  projectId: any;

  constructor(private httpService: HttpClientService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.parent.params.subscribe(x => this.projectId = x.id);

   }

  ngOnInit() {
    this.httpService.get('testInfo' + this.projectId).subscribe((data: ProjectTestViewModel[]) => {
      
    });
  }

}
