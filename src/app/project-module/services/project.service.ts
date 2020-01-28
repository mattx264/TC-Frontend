import { Injectable } from '@angular/core';
import { HttpClientService } from 'projects/shared/src/lib/services/http-client.service';
import { ProjectViewModel } from 'projects/shared/src/lib/models/project/projectViewModel';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  currentProjectId: number;
  currectProject: ProjectViewModel = null;
  constructor(private httpService: HttpClientService) { }
  getProject(id: number) {
    return new Promise((resolve) => {
      if (this.currentProjectId == id && this.currectProject != null) {
        return resolve(this.currectProject);
      }
      this.currectProject = null;
      this.currentProjectId = id;
      this.httpService.get('project/' + id).subscribe(data => {
        this.currectProject = data;
        resolve(this.currectProject);
      });
    });
  }
}
