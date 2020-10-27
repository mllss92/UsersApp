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

  constructor(public sharedService: SharedService) { }

  ngOnInit(): void {
  }

  signOut(): void {
    localStorage.clear();
  }
}
