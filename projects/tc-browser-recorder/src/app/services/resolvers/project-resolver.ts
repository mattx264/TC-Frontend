import { Injectable } from '@angular/core';
import { ProjectViewModel } from '../../../../../shared/src/lib/viewModels/project-view-model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClientService } from '../../../../../shared/src/lib/services/http-client.service';
import { ProjectTest } from '../../ViewModels/projectTests';

@Injectable({
  providedIn: 'root'
})
export class ProjectResolver implements Resolve<ProjectViewModel> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ProjectViewModel | Observable<ProjectViewModel> | Promise<ProjectViewModel> {
      return this.httpClientService.get('project').toPromise<any>();
  }

  resolveTests(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Array<ProjectTest> | Observable<Array<ProjectTest>> | Promise<Array<ProjectTest>> {
    return this.httpClientService.getGeneric<Array<ProjectTest>>('projectTest').toPromise<any>();
}


  constructor(private httpClientService: HttpClientService) { }
}
