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

    case UsersActions.FAILED_UPDATED_USER: // React to a failed call
      return state;
    case UsersActions.UPDATED_USER: // action.payload is updated user
      let indexOfUpdatedUser = state.users.findIndex(user => user.id == action.payload.id)

      let updatedUser = tassign(state.currentUser, action.payload.user)

      let usersArrayAfterUpdate = [
        ...state.users.slice(0, indexOfUpdatedUser),
        updatedUser,
        ...state.users.slice(indexOfUpdatedUser+1)
      ];

      return tassign(state, {users: usersArrayAfterUpdate, currentUser: updatedUser})
    case UsersActions.UPDATE_USER:
      return state;

    case UsersActions.FAILED_DELETED_USER: // React to a failed call
      return state;
    case UsersActions.DELETED_USER: // action.payload is id on user to delete
      let indexOfUserToBeDeleted = state.users.findIndex(user => user.id == action.payload)

      let usersArrayAfterDeletion = [
        ...state.users.slice(0, indexOfUserToBeDeleted),
        ...state.users.slice(indexOfUserToBeDeleted+1)
      ];

      return tassign(state, {users: usersArrayAfterDeletion});
    case UsersActions.DELETE_USER:
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