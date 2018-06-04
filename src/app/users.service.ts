import { Injectable } from "@angular/core";
import { UsersState } from "./store/store";
import { HttpClient } from "@angular/common/http";
import { User } from "./entities/user";


@Injectable()
export class UsersService {

  constructor(private http: HttpClient) {}

  private baseApi = 'https://give-a-crap.firebaseio.com/users.json';

  getUsers() {
    return this.http.get(this.baseApi);
  }

  getUserByEmail(email: String) {
    return this.http.get(`${this.baseApi}?orderBy="email"&equalTo="${email}"`);
  }

  createUser(user: User) {
    return this.http.post(this.baseApi, user);
  }

  updateUser(id: String, user: User) {
    const api = this.baseApi.slice(0, -5); // because stupid firebase
    return this.http.patch(`${api}/${id}.json`, user);
  }

  deleteUser(id: String) {
    const api = this.baseApi.slice(0, -5); // because stupid firebase
    return this.http.delete(`${api}/${id}.json`);
  }

  static getInitialUsersState() : UsersState {
    return {users: [], currentUser: undefined};
  }
}