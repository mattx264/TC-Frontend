import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.token) {
      request = request.clone({
          setHeaders: {
              Authorization: `Bearer ${currentUser.token}`
          }
      });
  }
    return next.handle(request);
  }
}
