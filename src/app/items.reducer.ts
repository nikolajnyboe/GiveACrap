import { ItemsState } from "./store/store";
import { tassign } from 'tassign';
import { ItemsService } from "./items.service";
import { ItemsActions } from "./items.actions";

const INITIAL_STATE: ItemsState = ItemsService.getInitialItemsState();

export function itemsReducer(state: ItemsState = INITIAL_STATE, action:any) {

  switch (action.type) {

    case ItemsActions.FAILED_RECEIVED_ITEMS:
      // React to a failed ws call, display error to user.
      console.log("FAIL");
      return state;

    case ItemsActions.RECEIVED_ITEMS: //action.payload is array of users
      // I could set loading flag to false
      return tassign(state, {items: action.payload});

    case ItemsActions.GET_ITEMS:
      // I could set a loading flag to true, showing the user that the data is loading
      return state;

    case ItemsActions.FAILED_CREATED_ITEM: // action.payload is a baby object to add
      // React to a failed ws call, display error to user.
      console.log("FAIL");
      return state;

    case ItemsActions.CREATED_ITEM: // action.payload is a baby object to add
      // Set loading state to false
      let newItemsArray = [...state.items, action.payload];

      return tassign(state, { items: newItemsArray});

    case ItemsActions.CREATE_ITEM: // action.payload is a baby object to add
      // Set loading state to true
      return state;

    default:
      return state;
  }

}