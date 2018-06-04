import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemsActions } from '../items.actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store/store';
import { Subscription } from 'rxjs/Subscription';
import { Item } from '../entities/item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  search: String;

  items: Item[];

  ngOnDestroy(): void {
    // Always unsubscribe on destroy.
    this.subscription.unsubscribe();
  }

  constructor(private ngRedux: NgRedux<IAppState>, private itemsActions: ItemsActions) { }

  ngOnInit() {
    this.itemsActions.getItems();
    this.subscription = this.ngRedux.select(state => state.items).subscribe(items => {
      console.log("items in component", items.items);
      this.items = items.items;
    });
  }

}
