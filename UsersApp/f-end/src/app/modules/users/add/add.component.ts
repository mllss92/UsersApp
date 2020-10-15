import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

import { User } from './../../../shared/interfaces/user';
import { NotifyService } from './../../../shared/services/notify.service';
import { HttpService } from './../../../shared/services/http.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  @Output() updateUserList = new EventEmitter<void>();

  isHidden = false;

  nameValidationMsg = 'Please use only Latin letters. Min length is 2 characters. Numbers and following symbols can not be used: !#:%,.()-_+^&*';
  emailValidationMsg = 'Please make sure you enter a valid email address';
  passwordValidationMsg = 'The password should contain 6 to 30 symbols and include both upper and lower case letters in Latin and min one number';

  createdForm: FormGroup;

  constructor(private httpService: HttpService, private notify: NotifyService) { }

  ngOnInit(): void {
    this.createdForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z]{2,}')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{6,30}')]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  createUser(): void {
    if (this.createdForm.value.password !== this.createdForm.value.confirmPassword) {
      this.notify.error('Passwords do not match. Please check and correct!');
      return;
    }
    const { name, email, password } = this.createdForm.value;
    this.httpService.createUser({ name, email, password }).subscribe(
      (res: User) => {
        this.createdForm.reset();
        this.isHidden = false;
        this.updateUserList.emit();
        this.notify.createdSuccessfully(
          `User with the name '${res.name}' and with the email address '${res.email}' has been created successfully! ${moment(res.created_at).format('yyyy-MM-DD HH:mm')}`
        );
      },
      err => {
        this.notify.error(`${err.message}`);
      }
    );
  }

}
