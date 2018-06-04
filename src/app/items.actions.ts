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

  static GET_ITEM: string = 'GET_ITEM';
  static RECEIVED_ITEM: string = 'RECEIVED_ITEM';
  static FAILED_RECEIVED_ITEM: string = 'FAILED_RECEIVED_ITEM';

  static CLEAR_SELECTED_ITEM: string = 'CLEAR_SELECTED_ITEM';

  static CREATE_ITEM: string = 'CREATE_ITEM';
  static CREATED_ITEM: string = 'CREATED_ITEM';
  static FAILED_CREATED_ITEM: string = 'FAILED_CREATED_ITEM';

  static UPDATE_ITEM: string = 'UPDATE_ITEM';
  static UPDATED_ITEM: string = 'UPDATED_ITEM';
  static FAILED_UPDATED_ITEM: string = 'FAILED_UPDATED_ITEM';

  static DELETE_ITEM: string = 'DELETE_ITEM';
  static DELETED_ITEM: string = 'DELETED_ITEM';
  static FAILED_DELETED_ITEM: string = 'FAILED_DELETED_ITEM';

  getItems() {
    this.ngRedux.dispatch({
      type: ItemsActions.GET_ITEMS
    })
  }

  getItem(id: String) {
    this.ngRedux.dispatch({
      type: ItemsActions.GET_ITEM,
      payload: id
    })
  }

  clearSelectedItem() {
    this.ngRedux.dispatch({
      type: ItemsActions.CLEAR_SELECTED_ITEM
    })
  }

  createItem(item: Item): void {
    this.ngRedux.dispatch({
      type: ItemsActions.CREATE_ITEM,
      payload: item
    })
  }

  updateItem(id: String, item: Item) {
    this.ngRedux.dispatch({
      type: ItemsActions.UPDATE_ITEM,
      payload: {id, item}
    })
  }

  deleteItem(id: String): void {
    this.ngRedux.dispatch({
      type: ItemsActions.DELETE_ITEM,
      payload: id
    })
  }
}