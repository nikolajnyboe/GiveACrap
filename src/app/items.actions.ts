import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "./store/store";
import { Item } from "./entities/item";


@Injectable()
export class ItemsActions {

  constructor (private ngRedux: NgRedux<IAppState>) {}

  static GET_ITEMS: string = 'GET_ITEMS';
  static RECEIVED_ITEMS: string = 'RECEIVED_ITEMS';
  static FAILED_RECEIVED_ITEMS: string = 'FAILED_RECEIVED_ITEMS';

  static CREATE_ITEM: string = 'CREATE_ITEM';
  static CREATED_ITEM: string = 'CREATED_ITEM';
  static FAILED_CREATED_ITEM: string = 'FAILED_CREATED_ITEM';

  getItems() {
    this.ngRedux.dispatch({
      type: ItemsActions.GET_ITEMS
    })
  }

  createItem(item: Item): void {
    this.ngRedux.dispatch({
      type: ItemsActions.CREATE_ITEM,
      payload: item
    })
  }
}