import { Injectable } from '@angular/core';

import { AuthorizedUser } from './../interfaces/authorized-user';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  authorizedUser: AuthorizedUser = {
    userData: {
      name: this.getName() || '',
      email: this.getEmail() || ''
    },
    token: this.getToken() || ''
  };

  constructor() { }

  private getToken(): string {
    return localStorage.getItem('auth_token');
  }

  private getName(): string {
    return localStorage.getItem('user_name');
  }

  private getEmail(): string {
    return localStorage.getItem('user_email');
  }
}
