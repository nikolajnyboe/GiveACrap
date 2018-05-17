import { Injectable } from "@angular/core";
import { ItemsState } from "./store/store";
import { HttpClient } from "@angular/common/http";
import { Item } from "./entities/item";


@Injectable()
export class ItemsService {

  constructor(private http: HttpClient) {}

  getItems() {
    return this.http.get('https://give-a-crap.firebaseio.com/items.json');
  }

  createItem(item: Item) {
    return this.http.post('https://give-a-crap.firebaseio.com/items.json', item);
  }

  static getInitialItemsState() : ItemsState {
    return { items: []};
  }
}