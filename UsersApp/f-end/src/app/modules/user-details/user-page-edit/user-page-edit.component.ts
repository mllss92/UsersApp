import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { SharedService } from './../../../shared/services/shared.service';
import { User } from './../../../shared/interfaces/user';
import { HttpService } from './../../../shared/services/http.service';
import { NotifyService } from './../../../shared/services/notify.service';

@Component({
  selector: 'app-user-page-edit',
  templateUrl: './user-page-edit.component.html',
  styleUrls: ['./user-page-edit.component.css']
})
export class UserPageEditComponent implements OnInit {

  infoAboutUser: User;
  selectValue: string;

  editForm: FormGroup;

  accesRights: string[] = [];

  constructor(
    private notify: NotifyService,
    private router: Router,
    private httpService: HttpService,
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.editForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z]{2,}')]),
      userRights: new FormControl('')
    });
    this.getInfoAboutUser(this.getUserIdFromUrl());
    this.selectValue = document.querySelector('select') ? document.querySelector('select').value : '';
    this.getAccessRights();
  }

  getUserIdFromUrl(): number {
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
      },
      () => {
        this.editForm.patchValue({
          name: this.infoAboutUser.name,
          userRights: this.infoAboutUser.userRights
        });
      }
    );
  }

  onSelectChange(select: HTMLInputElement): void {
    this.selectValue = select.value;
  }

  addRights(value: string): void {
    const newUserRights = this.editForm.value.userRights;
    if (!newUserRights.includes(value)) {
      newUserRights.push(value);
      this.editForm.patchValue({ userRights: newUserRights });
      this.editForm.markAsDirty();
    }
  }

  removeRights(value: string): void {
    let newUserRights = this.editForm.value.userRights;
    if (newUserRights.includes(value)) {
      newUserRights = newUserRights.filter((el: string) => el !== value);
      this.editForm.patchValue({ userRights: newUserRights });
      this.editForm.markAsDirty();
    }
  }

  cancelEdit(): void {
    const pathName = window.location.pathname.replace('/edit', '');
    this.router.navigate([pathName]);
  }

  onFormChange(): void {
    this.sharedService.isUserChenged = true;
  }

  onSubmit(): void {
    const updatedUser = this.editForm.value;
    updatedUser.id = this.infoAboutUser.id;

    this.httpService.editUser(updatedUser).subscribe(
      res => {
        if (res) {
          this.sharedService.isUserChenged = false;
          this.notify.success('Chages were saved successfully!');
          this.cancelEdit();
        }
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

  getAccessRights(): void {
    this.httpService.getAccessRight().subscribe(
      (res: string[]) => {
        this.accesRights = res;
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
}
