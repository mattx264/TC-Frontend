import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;
  constructor(private router: Router) {
    this.user = JSON.parse(localStorage.getItem('currentUser')) as User;
    if (this.user == null || this.user.firstName == null) {
      this.user = undefined;
    }
  }
  doGoogleLogin() {
    // return new Promise<any>((resolve, reject) => {
    //   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
    //     let provider = new firebase.auth.GoogleAuthProvider();
    //     provider.addScope('profile');
    //     provider.addScope('email');
    //     this.afAuth.auth
    //       .signInWithPopup(provider)
    //       .then(res => {
    //         resolve(res);
    //       })
    //   })
    // });
  }
  getCurrentUser(): User {
    if(this.user != null){
      this.user;
    } else{
      this.user= JSON.parse(localStorage.getItem('currentUser')) as User;
    }
    return this.user;
  }
  setsCurrentUser(user: User): void {
    this.user = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  logout() {
    localStorage.removeItem('currentUser');
  }
  unauthorize() {
    localStorage.removeItem('currentUser');

    this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
  }
  getToken(): string {
    if (this.user == null) {
      return "";
    }
    return this.user.token;
  }
}
