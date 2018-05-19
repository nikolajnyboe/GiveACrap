import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { IAppState } from './store/store';
import { NgRedux } from '@angular-redux/store';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private ngRedux: NgRedux<IAppState>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log("state.url " + state.url);
    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    const state = this.ngRedux.getState()
    const currentUser = state.users.currentUser
    console.log(currentUser);
    if (currentUser != undefined) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }



}
