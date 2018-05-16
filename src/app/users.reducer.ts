import { UsersState } from "./store/store";
import { tassign } from 'tassign';
import { UsersService } from "./users.service";
import { UsersActions } from "./users.actions";

const INITIAL_STATE: UsersState = UsersService.getInitialUsersState();

export function usersReducer(state: UsersState = INITIAL_STATE, action:any) {

  switch (action.type) {

    case UsersActions.FAILED_RECEIVED_USERS:
      // React to a failed ws call, display error to user.
      return state;

    case UsersActions.RECEIVED_USERS: //action.payload is array of users
      // I could set loading flag to false
      return tassign(state, {users: action.payload});

    case UsersActions.GET_USERS:
      // I could set a loading flag to true, showing the user that the data is loading
      return state;

    case UsersActions.FAILED_CREATED_USER: // action.payload is a baby object to add
      // React to a failed ws call, display error to user.
      console.log("FAIL");
      return state;

    case UsersActions.CREATED_USER: // action.payload is a baby object to add
      // Set loading state to false
      console.log("GREAT");
      let newUsersArray = [...state.users, action.payload];

      return tassign(state, { users: newUsersArray});

    case UsersActions.CREATE_USER: // action.payload is a baby object to add
      // Set loading state to true
      return state;

    default:
      return state;
  }

}