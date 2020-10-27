import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { NotifyService } from './notify.service';
import { SharedService } from './shared.service';
import { AuthorizedUser } from './../interfaces/authorized-user';
import { AuthData } from './../interfaces/auth-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private notify: NotifyService,
    private router: Router
  ) { }


  public tryLogin(authData: AuthData): void {
    this.http.post('http://localhost:3000/api/auth/login', authData).subscribe(
      (res: AuthorizedUser) => {
        if (res) {
          this.sharedService.authorizedUser = res;

          this.notify.success(`Hello, ${res.userData.name}, Login is successfull!`);
          this.router.navigate(['/home']);
          localStorage.setItem('auth_token', res.token);
          localStorage.setItem('user_name', res.userData.name);
          localStorage.setItem('user_email', res.userData.email);
          localStorage.setItem('is_login', res.isLogin.toString());
        }
      },
      err => {
        this.notify.error(err.error.message);
      }
    );
  }
}
