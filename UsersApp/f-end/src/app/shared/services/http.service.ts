import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Pagination } from './../interfaces/pagination';
import { AuthData } from './../interfaces/auth-data';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public tryLogin(authData: AuthData): Observable<object> {
    return this.http.post('http://localhost:3000/api/auth/login', authData);
  }

  public getUsers(pagination: Pagination): Observable<object> {
    return this.http.post('http://localhost:3000/api/users/get-users', pagination);
  }
}
