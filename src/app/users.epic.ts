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
      .mergeMap(({payload}) => {
          return this.usersService.getUsers()
            .map((result: any[]) => { // result: data from firebase api
              let usersArray = Object.keys(result) // convert firebase data to array
                .reduce((array, key) => {
                  const user = {...result[key]}
                  user.id = key;
                  delete user.password
                  array.push(user);
                  return array;
                }, [])
              return({ // when web service responds with success, call this action with payload that came back from webservice
                type: UsersActions.RECEIVED_USERS,
                payload: usersArray
              })
            })
            .catch(error => Observable.of({ // when web service responds with failure, call this action with payload that came back from webservice
              type: UsersActions.FAILED_RECEIVED_USERS,
              payload: error
            }));
    });
  }

  createUser = (action$: ActionsObservable<any>) => {
    return action$.ofType(UsersActions.CREATE_USER) // Listen for this action
      .mergeMap(({payload}) => { // payload: user
          delete payload.password2
          return this.usersService.createUser(payload)
            .map((result: any) => { // result: data from firebase api {name: "-id"}
              let user = payload
              user.id = result.name
              delete user.password
              return({ // when web service responds with success, call this action with payload that came back from webservice
                type: UsersActions.CREATED_USER,
                payload: user
              })
            })
            .catch(error => Observable.of({ // when web service responds with failure, call this action with payload that came back from webservice
              type: UsersActions.FAILED_CREATED_USER,
              payload: error
          }));
    });
  }

  updateUser = (action$: ActionsObservable<any>) => {
    return action$.ofType(UsersActions.UPDATE_USER) // Listen for this action
      .mergeMap(({payload}) => { // payload: {id, user}
          return this.usersService.updateUser(payload.id, payload.user)
            .map((result: any) => { // result: data from firebase api {updated user}
              result = {id: payload.id, user: result}
              return({ // when web service responds with success, call this action with payload that came back from webservice
                type: UsersActions.UPDATED_USER,
                payload: result
              })
            })
            .catch(error => Observable.of({ // when web service responds with failure, call this action with payload that came back from webservice
              type: UsersActions.FAILED_UPDATED_USER,
              payload: error
            }));
    });
  }

  deleteUser = (action$: ActionsObservable<any>) => {
    return action$.ofType(UsersActions.DELETE_USER) // Listen for this action
      .mergeMap(({payload}) => { // payload: id
          return this.usersService.deleteUser(payload)
            .map((result: any) => { // result: data from firebase api {}
              return({ // when web service responds with success, call this action with payload that came back from webservice
                type: UsersActions.DELETED_USER,
                payload: payload
              })
            })
            .catch(error => Observable.of({ // when web service responds with failure, call this action with payload that came back from webservice
              type: UsersActions.FAILED_DELETED_USER,
              payload: error
            }));
    });
  }

  login = (action$: ActionsObservable<any>) => {
    return action$.ofType(UsersActions.LOG_IN) // Listen for this action
      .mergeMap(({payload}) => { // payload: email to be logged in
          delete payload.password2
          return this.usersService.getUserByEmail(payload)
            .map((result: any) => { // result: data from firebase ap
              let user = Object.keys(result) // convert firebase data to array
                .reduce((object: any, key) => {
                  object = {...result[key]}
                  object.id = key;
                  return object;
                }, {})
              delete user.password
              if (user.email) {
                return({ // when web service responds with success, call this action with payload that came back from webservice
                  type: UsersActions.LOGGED_IN,
                  payload: user
                })
              } else {
                return({ // when web service responds with success, call this action with payload that came back from webservice
                  type: UsersActions.FAILED_LOGGED_IN,
                  payload: undefined
                })
              }
            })
            .catch(error => Observable.of({ // when web service responds with failure, call this action with payload that came back from webservice
              type: UsersActions.FAILED_LOGGED_IN,
              payload: error
          }));
    });
  }
}