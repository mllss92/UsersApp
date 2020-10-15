import { NotifyService } from './../../shared/services/notify.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SharedService } from './../../shared/services/shared.service';
import { HttpService } from './../../shared/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authForm: FormGroup;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private sharedService: SharedService,
    private notify: NotifyService
  ) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  tryLogin(): void {
    this.httpService.tryLogin(this.authForm.value).subscribe(
      res => {
        if (res) {
          this.notify.success('Hello, Name', 'Login is successfull!');
          this.router.navigate(['/home']);
        }
      }
    );
  }

}
