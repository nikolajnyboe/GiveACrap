const deepFreeze = require('deep-freeze');
import { itemsReducer } from "./items.reducer";
import { ItemsService } from "./items.service";
import { ItemsActions } from "./items.actions";

describe('Items reducer', () => {

  it('Should return the initial state', () => {
		expect(itemsReducer(undefined, {})).toEqual(ItemsService.getInitialItemsState());
  });

  it('Should add an item', () => {
    let initialState = ItemsService.getInitialItemsState();

    let initialItem = {
      name: 'Nintendo Switch',
      description: 'New and good'
    };

    initialState.items.push(initialItem);

    deepFreeze(initialState);

    let afterState = ItemsService.getInitialItemsState();

    let newItem = {
      name: 'Game Boy',
      description: 'Old but good'
    };

    afterState.items.push(initialItem, newItem);

    let newState = itemsReducer(initialState, {
      type: ItemsActions.CREATED_ITEM,
      payload: newItem
    });

    expect(newState).toEqual(afterState);
  });

});