import { SharedService } from './../../shared/services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name: string;
  email: string;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.name = this.sharedService.authorizedUser.userData.name;
    this.email = this.sharedService.authorizedUser.userData.email;
  }

  signOut(): void {
    localStorage.clear();
  }
}
