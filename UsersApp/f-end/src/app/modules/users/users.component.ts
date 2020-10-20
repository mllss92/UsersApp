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

  accesRight: boolean;

  edit = false;
  editedUser: User;

  constructor(
    private httpService: HttpService,
    private notify: NotifyService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.getUsers(this.pagination);
    this.getAccessRight(this.sharedService.authorizedUser.userData);
  }

  getUsers(pagination: Pagination): void {
    this.httpService.getUsers(pagination).subscribe(
      (res: UsersList) => {
        this.pagination = res.pagination;
        this.usersArr = res.data;
      },
      err => {
        if (err.error === 'Unauthorized') {
          this.notify.error(`${err.error}. Plese sign in!`);
          this.router.navigate(['/login']);
        }
      }
    );
  }

  onPageChange(): void {
    this.getUsers(this.pagination);
  }

  getAccessRight(user: object): void {
    this.httpService.getAccessRight(user).subscribe(
      res => {
        this.accesRight = res as unknown as boolean;
      },
      err => {
        this.notify.error(err.message);
      }
    );
  }

  getInfoAboutUser(userId: number): void {
    this.router.navigate([`/users/${userId}`]);
  }

  editUser(user: User): void {
    this.editedUser = user;
    this.edit = !this.edit;
  }

  deleteUser(userId: number): void {
    const agree = confirm('Do you want delete this user?');
    if (!agree) {
      return;
    }
    this.httpService.deleteUser(userId).subscribe(
      res => {
        if (res) {
          this.notify.success('Deleted successfully!');
          this.onPageChange();
        }
      },
      err => {
        this.notify.error(err.error);
      }
    );
  }

}
