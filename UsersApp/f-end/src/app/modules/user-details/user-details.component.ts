import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { NotifyService } from './../../shared/services/notify.service';
import { User } from './../../shared/interfaces/user';
import { HttpService } from './../../shared/services/http.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  infoAboutUser: User = {
    name: '',
    email: '',
    userRights: []
  };

  accesRight: string[] = [];

  constructor(
    private httpService: HttpService,
    private notify: NotifyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAccessRight();
    this.getInfoAboutUser(this.getUserIdfromUrl());
  }

  private getUserIdfromUrl(): number {
    const id = +window.location.pathname.split('/')[2];
    if (isNaN(id)) {
      this.notify.error('Invalid URL address!');
      this.router.navigate(['/home']);
    } else {
      return id;
    }
  }

  getInfoAboutUser(id: number): void {
    this.httpService.getInfoAboutUser(id).subscribe(
      (res: User) => {
        if (!res) {
          this.notify.error('User does not exist!');
          this.router.navigate(['/home']);
        } else {
          this.infoAboutUser = res;
        }
      },
      err => {
        if (err.error === 'Unauthorized') {
          this.notify.error(`Token is expired. Please sign in!`);
          this.router.navigate(['/login']);
        } else {
          this.notify.error(err.message);
          this.router.navigate(['/home']);
        }
      }
    );
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

  editUser(): void {
    this.router.navigate([`/users/${this.getUserIdfromUrl()}/edit`]);
  }

  deleteUser(): void {
    const question = confirm('Are you shure you want to delete this User?');
    if (question) {
      this.httpService.deleteUser(this.infoAboutUser.id).subscribe(
        res => {
          if (res) {
            this.notify.success('User has been deleted successfully!');
            this.router.navigate(['/users']);
          }
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
  }

}
