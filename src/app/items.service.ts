import { Injectable } from "@angular/core";
import { ItemsState } from "./store/store";
import { HttpClient } from "@angular/common/http";
import { Item } from "./entities/item";


@Injectable()
export class ItemsService {

  constructor(private http: HttpClient) {}

  private baseApi = 'https://give-a-crap.firebaseio.com/items.json';

  getItems() {
    return this.http.get(this.baseApi);
  }

  getItem(id: String) {
    const api = this.baseApi.slice(0, -5); // because stupid firebase
    return this.http.get(`${api}/${id}.json`);
  }

  createItem(item: Item) {
    return this.http.post(this.baseApi, item);
  }

  updateItem(id: String, item: Item) {
    const api = this.baseApi.slice(0, -5); // because stupid firebase
    return this.http.patch(`${api}/${id}.json`, item);
  }

  deleteItem(id: String) {
    const api = this.baseApi.slice(0, -5); // because stupid firebase
    return this.http.delete(`${api}/${id}.json`);
  }

  static getInitialItemsState() : ItemsState {
    return { items: [], selectedItem: undefined};
  }
}