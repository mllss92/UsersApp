import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { SharedService } from './../../shared/services/shared.service';
import { NotifyService } from './../../shared/services/notify.service';
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

  accesRight: string[] = [''];

  edit = false;
  editedUser: User;

  constructor(
    private httpService: HttpService,
    private notify: NotifyService,
    private router: Router,
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.getUsers(this.pagination);
    this.getAccessRight();
  }

  getUsers(pagination: Pagination): void {
    this.httpService.getUsers(pagination).subscribe(
      (res: UsersList) => {
        this.pagination = res.pagination;
        this.usersArr = res.data;
      },
      err => {
        if (err.error === 'Unauthorized') {
          this.notify.error(`Token is expired. Please sign in!`);
          this.router.navigate(['/login']);
        } else {
          this.notify.error(err.error);
        }
      }
    );
  }

  onPageChange(): void {
    this.getUsers(this.pagination);
  }

  getAccessRight(): void {
    this.httpService.getAccessRight().subscribe(
      (res: string[]) => {
        this.accesRight = res;
      },
      err => {
        if (err.error === 'Unauthorized') {
          this.notify.error('No access right! Please sign in!');
        } else {
          this.notify.error(err.message);
        }
      }
    );
  }

  getInfoAboutUser(userId: number): void {
    this.router.navigate([`/users/${userId}`]);
  }


}
