import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';


import { HttpService } from './../services/http.service';
import { NotifyService } from './../services/notify.service';

@Injectable({
  providedIn: 'root'
})
export class RightsGuard implements CanActivate {

  accessRights: string[] = [];

  constructor(
    private router: Router,
    private notify: NotifyService,
    private httpService: HttpService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const path = route.routeConfig.path;

    return this.httpService.getAccessRight().pipe(
      map((res: string[]) => {
        if (path === 'users/:id') {
          if (res.includes('can_view_details') || res.includes('can_view_details_full')) {
            return true;
          }
        }
        if (path === 'edit') {
          if (res.includes('can_edit_users') || res.includes('can_edit_users_full')) {
            return true;
          }
        }
        this.notify.error('You do not have appropriate rights!');
        this.router.navigate(['/home']);
      })
    );
  }

}
