import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './store/store';
import { Subscription } from 'rxjs/Subscription';
import { UsersActions } from './users.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  subscription: Subscription;

  private currentUser

  constructor(private ngRedux: NgRedux<IAppState>, private usersActions: UsersActions) { }

  ngOnInit() {
    this.subscription = this.ngRedux.select(state => state.users).subscribe(users => {
      console.log("currentUser", users.currentUser);
      this.currentUser = users.currentUser;
    });
  }

  logout() {
    this.usersActions.logout();
  }
}
