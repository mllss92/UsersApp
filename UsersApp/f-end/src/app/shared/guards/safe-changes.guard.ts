import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { SharedService } from './../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class SafeChangesGuard implements CanDeactivate<unknown> {

  constructor(
    private sharedService: SharedService
  ) { }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.sharedService.isUserChenged) {
      const question = confirm('Do you want exit without saving?');
      if (question) {
        this.sharedService.isUserChenged = false;
      }
      return question;
    }
    return true;
  }

}
