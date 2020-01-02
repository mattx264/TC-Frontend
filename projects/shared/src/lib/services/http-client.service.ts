import { Injectable, Inject } from '@angular/core';
import { HttpParams, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoadingService } from './loading/loading.service';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, first, finalize, map } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  address: string;
  constructor(@Inject('environment') private environment, private http: HttpClient, private router: Router, private loadingService: LoadingService, private authService: AuthService) {
    // check if angular is compile for prod and if it is dev api
    if (environment.production === true) {
      this.address = '/api/';
    } else {
      this.address = 'https://localhost:44384/api/';
    }
  }
  get(url: string): Observable<Object> {
    this.loadingService.setValue(true);

    return this.http.get(this.apiUrl(url)).pipe(map(data => {
      this.loadingService.setValue(false);
      return data;
    }), catchError(this.handleError), finalize(() => {
      this.loadingService.setValue(false);
    }), first());
  }
  getParams(url: string, params: Object): Observable<Object> {
    let reqParams = new HttpParams();
    for (const item in params) {
      if (item !== undefined) {
        if (params[item] !== null && params[item] !== 'null') {
          reqParams = reqParams.append(item, params[item]);
        }
      }

    }
    this.loadingService.setValue(true);
    return this.http.get(this.apiUrl(url), { params: reqParams }).pipe(map(data => {
      this.loadingService.setValue(false);
      return data;
    }), catchError(this.handleError), first());
  }
  post(url: string, data: object | number) {
    this.loadingService.setValue(true);

    return this.http.post(this.apiUrl(url), data).pipe(map(returnData => {
      return returnData;
    }), catchError(this.handleError), finalize(() => {
      this.loadingService.setValue(false);
    }), first());
  }
  put(url: string, data: object | number) {
    this.loadingService.setValue(true);

    return this.http.put(this.apiUrl(url), data).pipe(map(returnData => {
      return returnData;
    }), catchError(this.handleError), finalize(() => {
      this.loadingService.setValue(false);
    }), first());
  }
  postWithoutSpinner(url: string, data: object | number) {

    return this.http.post(this.apiUrl(url), data, { responseType: 'text' }).pipe(map(returnData => {
      return returnData;
    }), catchError(this.handleError), finalize(() => {
      this.loadingService.setValue(false);
    }), first());
  }
  delete(url: string, params: object) {
    let reqParams = new HttpParams();
    for (const item in params) {
      if (item !== undefined) {
        if (params[item] !== null && params[item] !== 'null') {
          reqParams = reqParams.append(item, params[item]);
        }
      }

    }
    this.loadingService.setValue(true);
    return this.http.delete(this.apiUrl(url), { params: reqParams }).pipe(map(data => {
      this.loadingService.setValue(false);
      return data;
    }), first());
  }
  public handleError = (error: HttpErrorResponse) => {

    // Do messaging and error handling here
    if (error.status===0) {
      this.router.navigate(['server-not-avaiable']);
    }
    if (error.status === 500 || error.status===0) {
    
      this.router.navigate(['error-page']);
     // throw new Error(error.message);
      // TODO log error be sending it to backend
    }
    // Unauthorize
    if (error.status === 401) {
      this.authService.unauthorize();
    }
    return observableThrowError(error);
  }
  private apiUrl(url: string): string {
    return this.address + url;
  }
}
