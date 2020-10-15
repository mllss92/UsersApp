import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private toastr: ToastrService) { }

  error(msg: string): void {
    this.toastr.error(msg);
  }

  success(msg: string, titel?: string): void {
    this.toastr.success(msg, titel);
  }

  createdSuccessfully(msg: string): void {
    this.toastr.success(
      msg,
      'Successfully!',
      { positionClass: 'toast-top-full-width', timeOut: 6000 }
    );
  }
}
