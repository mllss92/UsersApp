import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SharedService } from './shared.service';
import { User } from './../interfaces/user';
import { Pagination } from './../interfaces/pagination';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  public makeHeaders(): object {
    return {
      headers: {
        Authorization: this.sharedService.authorizedUser.token
      }
    };
  }

  public getUsers(pagination: Pagination): Observable<object> {
    return this.http.post('http://localhost:3000/api/users/get-users', pagination, this.makeHeaders());
  }

  public createUser(user: User): Observable<object> {
    return this.http.post('http://localhost:3000/api/users/create-user', user, this.makeHeaders());
  }

  public getAccessRight(user: object): Observable<object> {
    return this.http.post('http://localhost:3000/api/users/get-access-right', user, this.makeHeaders());
  }

  public getInfoAboutUser(userId: number): Observable<object> {
    return this.http.get(`http://localhost:3000/api/users/get-info-about-user/${userId}`, this.makeHeaders());
  }

  public getInfoAboutSelf(email: object): Observable<object> {
    return this.http.post('http://localhost:3000/api/users/get-info-about-self', email, this.makeHeaders());
  }

  public editUser(user: User): Observable<object> {
    return this.http.post('http://localhost:3000/api/users/edit-user', user, this.makeHeaders());
  }

  public deleteUser(id: number): Observable<object> {
    return this.http.delete(`http://localhost:3000/api/users/delete-user/${id}`, this.makeHeaders());
  }

}
