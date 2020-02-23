import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClientService } from '../../../../../shared/src/lib/services/http-client.service';
import { ProjectViewModel } from 'projects/shared/src/lib/viewModels/ProjectViewModel';
import { TestInfoViewModel } from 'projects/shared/src/lib/viewModels/TestInfoViewModel';

@Injectable({
  providedIn: 'root'
})
export class ProjectResolver implements Resolve<ProjectViewModel> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ProjectViewModel | Observable<ProjectViewModel> | Promise<ProjectViewModel> {
      return this.httpClientService.get('project').toPromise<any>();
  }

  resolveTests(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Array<TestInfoViewModel> | Observable<Array<TestInfoViewModel>> | Promise<Array<TestInfoViewModel>> {
    return this.httpClientService.getGeneric<Array<TestInfoViewModel>>('projectTest').toPromise<any>();
}


  constructor(private httpClientService: HttpClientService) { }
}
