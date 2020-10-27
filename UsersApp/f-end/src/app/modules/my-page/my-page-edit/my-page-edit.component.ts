import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { SharedService } from './../../../shared/services/shared.service';
import { NotifyService } from './../../../shared/services/notify.service';
import { User } from './../../../shared/interfaces/user';
import { HttpService } from './../../../shared/services/http.service';

@Component({
  selector: 'app-my-page-edit',
  templateUrl: './my-page-edit.component.html',
  styleUrls: ['./my-page-edit.component.css']
})
export class MyPageEditComponent implements OnInit {

  infoAboutSelf: User = {
    name: ''
  };
  editForm: FormGroup;

  constructor(
    private httpService: HttpService,
    private notify: NotifyService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.httpService.getInfoAboutSelf().subscribe(
      (res: User) => {
        this.infoAboutSelf = res;

        this.editForm.patchValue({
          name: this.infoAboutSelf.name,
          email: this.infoAboutSelf.email
        });
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

    this.editForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z]{2,}')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{6,30}'))
    });
  }

  cancelEdit(): void {
    this.router.navigate(['/my-page']);
  }

  onSubmit(userData: User, oldPassword: HTMLInputElement, confirmPassword: HTMLInputElement): void {
    if (userData.password || oldPassword.value) {
      if (!oldPassword.value || !confirmPassword.value) {
        this.notify.error('One of the password fields is invalid. Please check and correct!');
        return;
      }

      if (userData.password !== confirmPassword.value) {
        this.notify.error('Passwords do not match!');
        return;
      }
      this.saveChangesOnDb(userData, oldPassword.value);
    } else {
      this.saveChangesOnDb(userData);
    }
  }

  saveChangesOnDb(userData: User, oldPassword?: string): void {
    this.httpService.editSelf(userData, oldPassword).subscribe(
      (res: User) => {
        this.sharedService.authorizedUser.userData = res;
        localStorage.setItem('user_name', res.name);
        localStorage.setItem('user_email', res.email);
        this.notify.success('Chages were saved successfully!');
        this.sharedService.isUserChenged = false;
        this.router.navigate(['/my-page']);
      },
      err => {
        if (err.error === 'Unauthorized') {
          this.notify.error(`Token is expired. Please sign in!`);
          this.router.navigate(['/login']);
        } else {
          this.notify.error(err.error.message || err.message);
        }
      }
    );
  }

  onFormChange(): void {
    this.sharedService.isUserChenged = true;
  }

}
