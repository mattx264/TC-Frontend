import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClientService } from '../../../../../shared/src/lib/services/http-client.service';
import { ProjectViewModel } from 'projects/shared/src/lib/viewModels/ProjectViewModel';

@Injectable({
  providedIn: 'root'
})
export class ProjectTestResolverService implements Resolve<ProjectViewModel[]> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Array<ProjectViewModel> | Observable<Array<ProjectViewModel>> | Promise<Array<ProjectViewModel>> {
    return this.http.getGeneric<Array<ProjectViewModel>>('projectTest').toPromise<any>();
}


  constructor(private http: HttpClientService) { }
}