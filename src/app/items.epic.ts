import { Injectable } from "@angular/core";
import { ItemsService } from "./items.service";
import { ActionsObservable } from "redux-observable";
import { ItemsActions } from "./items.actions";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from "./entities/user";


@Injectable()
export class ItemsEpic {
  constructor(private itemsService: ItemsService) {}

  getItems = (action$: ActionsObservable<any>) => {
    return action$.ofType(ItemsActions.GET_ITEMS) // Listen for this action
      .mergeMap(({payload}) => {
        return this.itemsService.getItems()
          .map((result: any[]) => { // result: data from firebase api
            let itemsArray = Object.keys(result) // convert firebase data to array
              .reduce((array, key) => {
                const item = {...result[key]}
                item.id = key;
                array.push(item);
                return array;
              }, [])
            return({ // when web service responds with success, call this action with payload that came back from webservice
              type: ItemsActions.RECEIVED_ITEMS,
              payload: itemsArray
            })
          })
          .catch(error => Observable.of({ // when web service responds with failure, call this action with payload that came back from webservice
            type: ItemsActions.FAILED_RECEIVED_ITEMS,
            payload: error
          }));
    });
  }

  createItem = (action$: ActionsObservable<any>) => {
    return action$.ofType(ItemsActions.CREATE_ITEM) // Listen for this action
      .mergeMap(({payload}) => { // payload: item
        return this.itemsService.createItem(payload)
          .map((result: any) => { // result: data from firebase api {name: "-id"}
            let item = payload
            item.id = result.name
            return({ // when web service responds with success, call this action with payload that came back from webservice
              type: ItemsActions.CREATED_ITEM,
              payload: item
            })
          })
          .catch(error => Observable.of({ // when web service responds with failure, call this action with payload that came back from webservice
            type: ItemsActions.FAILED_CREATED_ITEM,
            payload: error
        }));
    });
  }
}