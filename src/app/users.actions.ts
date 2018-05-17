import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "./store/store";
import { User } from "./entities/user";


@Injectable()
export class UsersActions {

  constructor (private ngRedux: NgRedux<IAppState>) {}

  static GET_USERS: string = 'GET_USERS';
  static RECEIVED_USERS: string = 'RECEIVED_USERS';
  static FAILED_RECEIVED_USERS: string = 'FAILED_RECEIVED_USERS';

  static CREATE_USER: string = 'CREATE_USER';
  static CREATED_USER: string = 'CREATED_USER';
  static FAILED_CREATED_USER: string = 'FAILED_CREATED_USER';

  static LOG_IN: string = 'LOG_IN';
  static LOGGED_IN: string = 'LOGGED_IN';
  static FAILED_LOGGED_IN: string = 'FAILED_LOGGED_IN';

  static LOG_OUT: string = 'LOG_OUT';

  getUsers() {
    this.ngRedux.dispatch({
      type: UsersActions.GET_USERS
    })
  }

  createUser(user: User) {
    this.ngRedux.dispatch({
      type: UsersActions.CREATE_USER,
      payload: user
    })
  }

  login(email: String) {
    this.ngRedux.dispatch({
      type: UsersActions.LOG_IN,
      payload: email
    })
  }
}