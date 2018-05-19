import { UsersState } from "./store/store";
import { tassign } from 'tassign';
import { UsersService } from "./users.service";
import { UsersActions } from "./users.actions";

const INITIAL_STATE: UsersState = UsersService.getInitialUsersState();

export function usersReducer(state: UsersState = INITIAL_STATE, action:any) {

  switch (action.type) {

    case UsersActions.FAILED_RECEIVED_USERS: // React to a failed call
      return state;
    case UsersActions.RECEIVED_USERS: //action.payload is array of users
      return tassign(state, {users: action.payload});
    case UsersActions.GET_USERS:
      return state;

    case UsersActions.FAILED_CREATED_USER: // React to a failed call
      return state;
    case UsersActions.CREATED_USER: // action.payload is a user object to add
      let newUsersArray = [...state.users, action.payload];
      return tassign(state, {users: newUsersArray});
    case UsersActions.CREATE_USER:
      return state;

    case UsersActions.FAILED_LOGGED_IN:
      return state;
    case UsersActions.LOGGED_IN: // action.payload is logged in user
      return tassign(state, {currentUser: action.payload});
    case UsersActions.LOG_IN:
      return state;

    case UsersActions.LOG_OUT:
      return tassign(state, {currentUser: undefined});

    default:
      return state;
  }

}