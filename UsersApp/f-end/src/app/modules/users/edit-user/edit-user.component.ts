import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { NotifyService } from './../../../shared/services/notify.service';
import { User } from './../../../shared/interfaces/user';
import { HttpService } from './../../../shared/services/http.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @Input() editedUser: User;
  @Output() cancel = new EventEmitter<void>();

  constructor(
    private httpService: HttpService,
    private notify: NotifyService
  ) { }

  ngOnInit(): void {
  }

  save(name: HTMLInputElement): void {
    this.editedUser.name = name.value;

    this.httpService.editUser(this.editedUser).subscribe(
      res => {
        if (res) {
          this.notify.success('Updates applied successfully!');
          this.cancel.emit();
        }
      },
      err => {
        this.notify.error(err.error);
      }
    );
  }
}
