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
  };

  constructor(
    private httpService: HttpService,
    private notify: NotifyService,
    private router: Router
  ) { }

  ngOnInit(): void {
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
          this.notify.error(`${err.error}. Plese sign in!`);
          this.router.navigate(['/login']);
        } else {
          this.notify.error(err.message);
          this.router.navigate(['/home']);
        }
      }
    );
  }

}
