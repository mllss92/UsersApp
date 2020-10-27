import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { NotifyService } from './../services/notify.service';
import { SharedService } from './../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private notify: NotifyService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.sharedService.authorizedUser.isLogin) {
      return true;
    }
    this.notify.error('Unauthorized. Please sign in!');
    this.router.navigate(['/login']);
  }

}
