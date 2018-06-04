import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { usersReducer } from '../users.reducer';
import { User } from '../entities/user';
import { itemsReducer } from '../items.reducer';
import { Item } from '../entities/item';

export class UsersState {
 users: User[];
 currentUser: User;
}

export class ItemsState {
  items: Item[];
  selectedItem: Item;
 }

export class IAppState {
 users?: UsersState;
 items?: ItemsState;
}

export const rootReducer = combineReducers<IAppState>({
 users: usersReducer,
 items: itemsReducer,
 // when you add more reducers, add them here..

 router: routerReducer
});
