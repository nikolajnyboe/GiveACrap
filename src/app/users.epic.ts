import { Injectable } from "@angular/core";
import { UsersService } from "./users.service";
import { ActionsObservable } from "redux-observable";
import { UsersActions } from "./users.actions";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from "./entities/user";


@Injectable()
export class UsersEpic {
  constructor(private usersService: UsersService) {}

  getUsers = (action$: ActionsObservable<any>) => {
    return action$.ofType(UsersActions.GET_USERS) // Listen for this action
      .mergeMap(({payload}) => { // payload: (subject: Subject, date: Date): When this action is activated, call ws through service class or directly like below
          return this.usersService.getUsers()
            .map((result: any[]) => ({ // when web service responds with success, call this action with payload that came back from webservice
              type: UsersActions.RECEIVED_USERS,
              payload: result.filter(x => x.Nikolaj === true)
            }))
            .catch(error => Observable.of({ // when web service responds with failure, call this action with payload that came back from webservice
              type: UsersActions.FAILED_RECEIVED_USERS,
              payload: error
            }));
    });
  }

  createUser = (action$: ActionsObservable<any>) => {
    return action$.ofType(UsersActions.CREATE_USER) // Listen for this action
      .mergeMap(({payload}) => { // payload: (subject: Subject, date: Date): When this action is activated, call ws through service class or directly like below
          return this.usersService.createUser(payload)
            .map((result: User) => ({ // when web service responds with success, call this action with payload that came back from webservice
              type: UsersActions.CREATED_USER,
              payload: result
            }))
            .catch(error => Observable.of({ // when web service responds with failure, call this action with payload that came back from webservice
              type: UsersActions.FAILED_CREATED_USER,
              payload: error
          }));
    });
  }
}