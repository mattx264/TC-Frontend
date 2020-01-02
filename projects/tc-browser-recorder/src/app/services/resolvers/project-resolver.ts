import { Injectable } from '@angular/core';
import { ProjectViewModel } from '../../../../../shared/src/lib/viewModels/project-view-model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClientService } from '../../../../../shared/src/lib/services/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectResolver implements Resolve<ProjectViewModel> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ProjectViewModel | Observable<ProjectViewModel> | Promise<ProjectViewModel> {
   
      // return this.httpClientService.get('project').toPromise().then(data => {

      // });
      return this.httpClientService.get('project').toPromise<any>();
      //throw new Error("Method not implemented.");
    
  }

  constructor(private httpClientService: HttpClientService) { }
}
