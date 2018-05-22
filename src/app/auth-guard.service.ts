import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { IAppState } from './store/store';
import { NgRedux } from '@angular-redux/store';
import { User } from './entities/user';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private ngRedux: NgRedux<IAppState>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    switch(state.url) {
      case '/admin': {
        // check if logged in and admin
        return this.checkAdmin();
      }
      default: {
        // check if logged in
        return this.checkLogin();
      }
    }
  }

  checkLogin() {
    const currentUser = this.getCurrentUser();

    if (currentUser != undefined) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  checkAdmin() {
    const currentUser = this.getCurrentUser();

    if (currentUser != undefined && currentUser.admin === true) {
      return true;
    } else if (currentUser != undefined && currentUser.admin === false) {
      this.router.navigate(['/home']);
      return false;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  getCurrentUser() {
    const state = this.ngRedux.getState()
    return state.users.currentUser;
  }

}
