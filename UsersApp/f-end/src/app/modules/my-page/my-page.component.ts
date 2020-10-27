import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotifyService } from './../../shared/services/notify.service';
import { User } from './../../shared/interfaces/user';
import { SharedService } from './../../shared/services/shared.service';
import { HttpService } from './../../shared/services/http.service';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css']
})
export class MyPageComponent implements OnInit {

  infoAboutSelf: User = {
    name: '',
    email: '',
    userRights: []
  };

  constructor(
    private httpService: HttpService,
    private sharedService: SharedService,
    private notify: NotifyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getInfoAboutSelf();

  }

  getInfoAboutSelf(): void {
    this.httpService.getInfoAboutSelf().subscribe(
      (res: User) => {
        this.infoAboutSelf = res;
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

  editSelf(): void {
    this.router.navigate(['/my-page/edit']);
  }
}
