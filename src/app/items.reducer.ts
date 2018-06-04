import { ItemsState } from "./store/store";
import { tassign } from 'tassign';
import { ItemsService } from "./items.service";
import { ItemsActions } from "./items.actions";

const INITIAL_STATE: ItemsState = ItemsService.getInitialItemsState();

export function itemsReducer(state: ItemsState = INITIAL_STATE, action:any) {

  switch (action.type) {

    case ItemsActions.FAILED_RECEIVED_ITEMS: // React to a failed ws call, display error to user.
      return state;
    case ItemsActions.RECEIVED_ITEMS: //action.payload is array of users
      return tassign(state, {items: action.payload});
    case ItemsActions.GET_ITEMS:
      return state;

    case ItemsActions.FAILED_RECEIVED_ITEM: // React to a failed ws call, display error to user.
      return state;
    case ItemsActions.RECEIVED_ITEM: //action.payload is user {}
      return tassign(state, {selectedItem: action.payload});
    case ItemsActions.GET_ITEM:
      return state;

    case ItemsActions.FAILED_CREATED_ITEM: // React to a failed ws call, display error to user.
      return state;
    case ItemsActions.CREATED_ITEM: // action.payload is a item object to add
      let newItemsArray = [...state.items, action.payload];
      return tassign(state, { items: newItemsArray});
    case ItemsActions.CREATE_ITEM:
      return state;

    case ItemsActions.FAILED_UPDATED_ITEM: // React to a failed ws call, display error to user.
      return state;
    case ItemsActions.UPDATED_ITEM: // action.payload is updated item
    let indexOfUpdatedItem = state.items.findIndex(item => item.id == action.payload.id)

    let updatedItem = tassign(state.selectedItem, action.payload.item)

    let itemsArrayAfterUpdate = [
      ...state.items.slice(0, indexOfUpdatedItem),
      updatedItem,
      ...state.items.slice(indexOfUpdatedItem+1)
    ];

    return tassign(state, {items: itemsArrayAfterUpdate, selectedItem: updatedItem})
    case ItemsActions.UPDATE_ITEM:
      return state;

    case ItemsActions.CLEAR_SELECTED_ITEM:
      return tassign(state, {selectedItem: undefined})

    case ItemsActions.FAILED_DELETED_ITEM: // React to a failed ws call, display error to user.
      return state;
    case ItemsActions.DELETED_ITEM: // action.payload is id on user to delete
      let indexOfItemToBeDeleted = state.items.findIndex(item => item.id == action.payload)

      let itemsArrayAfterDeletion = [
        ...state.items.slice(0, indexOfItemToBeDeleted),
        ...state.items.slice(indexOfItemToBeDeleted+1)
      ];

      return tassign(state, {items: itemsArrayAfterDeletion});
    case ItemsActions.DELETE_ITEM:
      return state;

    default:
      return state;
  }

}