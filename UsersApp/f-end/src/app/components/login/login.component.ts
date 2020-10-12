import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpService } from './../../shared/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authForm: FormGroup;

  constructor(private httpService: HttpService, private router: Router) { }

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
          this.router.navigate(['/home']);
        }
      }
    );
  }

}
