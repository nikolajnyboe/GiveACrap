import { Injectable } from "@angular/core";
import { UsersState } from "./store/store";
import { HttpClient } from "@angular/common/http";
import { User } from "./entities/user";


@Injectable()
export class UsersService {

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get('http://angular2api2.azurewebsites.net/api/internships');
  }

  createUser(user: User) {
    user.Nikolaj = true;
    return this.http.post('http://angular2api2.azurewebsites.net/api/internships', user);
  }

  static getInitialUsersState() : UsersState {
    return { users: []};
  }
}