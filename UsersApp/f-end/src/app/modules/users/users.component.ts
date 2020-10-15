import { Component, OnInit } from '@angular/core';

import { HttpService } from './../../shared/services/http.service';
import { UsersList } from './../../shared/interfaces/users-list';
import { User } from './../../shared/interfaces/user';
import { Pagination } from './../../shared/interfaces/pagination';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  usersArr: User[];

  pagination = {
    page: 1,
    pageSize: 8,
    collectionSize: 0
  };

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getUsers(this.pagination);
  }

  getUsers(pagination: Pagination): void {
    this.httpService.getUsers(pagination).subscribe(
      (res: UsersList) => {
        this.pagination = res.pagination;
        this.usersArr = res.data;
      }
    );
  }

  onPageChange(): void {
    this.getUsers(this.pagination);
  }

}
