import { Injectable, Inject } from '@angular/core';
import { HttpParams, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoadingService } from './loading/loading.service';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, first, finalize, map } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

enum SiteEndpoints {
    Project,
    EditProject
}


@Injectable({
  providedIn: 'root'
})

export class WebsiteService {
    
//


  address: string;

  constructor(@Inject('environment')
              private environment,
              private http: HttpClient,
              private router: Router,
              private loadingService: LoadingService,
              private authService: AuthService) {
    // check if angular is compile for prod and if it is dev api
    if (environment.production === true) {
        this.address = 'https:www.sitest.io';
    } else {
        this.address = 'http://localhost:4200';
    }
  }

  public navigateEditProject(id: number): void {
    window.open(`${this.address}/project/${id}/edit`,'blank');
  }


  public navigateNewProject(): void {
    window.open(`${this.address}/project/create`,'blank');
  }


}