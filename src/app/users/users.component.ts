import { Component, OnInit, OnDestroy } from '@angular/core';
import { Item } from '../entities/item';
import { UsersActions } from '../users.actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/store';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../entities/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  subscription: Subscription;

  users: User[];

  ngOnDestroy(): void {
    // Always unsubscribe on destroy.
    this.subscription.unsubscribe();
  }

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private usersActions: UsersActions
  ) { }

  ngOnInit() {
    this.usersActions.getUsers();
    this.subscription = this.ngRedux.select(state => state.users).subscribe(users => {
      console.log("users in component", users.users);
      this.users = users.users;
    });
  }

}
