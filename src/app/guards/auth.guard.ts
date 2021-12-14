import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router, } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let identity = this._userService.getIdentity();
    if (identity) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
