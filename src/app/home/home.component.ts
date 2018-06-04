import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemsActions } from '../items.actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/store';
import { Subscription } from 'rxjs/Subscription';
import { Item } from '../entities/item';
import { User } from '../entities/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private router: Router,
    private itemsActions: ItemsActions
  ) { }

  subscription: Subscription;
  userSubscription: Subscription;

  search: String;

  items: Item[];

  currentUser: User;

  selectItem(id: String) {
    this.router.navigate([`item-detail/${id}`]);
  }

  deleteItem(id: String) {
    this.itemsActions.deleteItem(id);
  }

  ngOnDestroy(): void {
    // Always unsubscribe on destroy.
    this.subscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  ngOnInit() {
    this.userSubscription = this.ngRedux.select(state => state.users).subscribe(users => {
      this.currentUser = users.currentUser;
      console.log(this.currentUser);
    });
    this.itemsActions.getItems();
    this.subscription = this.ngRedux.select(state => state.items).subscribe(items => {
      console.log("items in component", items.items);
      this.items = items.items;
    });
  }

}
