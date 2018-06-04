import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './store/store';
import { Subscription } from 'rxjs/Subscription';
import { UsersActions } from './users.actions';
import { User } from './entities/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';

  subscription: Subscription;

  currentUser: User

  ngOnDestroy(): void {
    // Always unsubscribe on destroy.
    this.subscription.unsubscribe();
  }

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
