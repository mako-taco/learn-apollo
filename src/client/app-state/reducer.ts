import { AppActions } from './actions';
import { AppState } from './state';
import { GQLAPIClient } from '../api-client/gql-api-client';

export function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case 'create-account':
      return {
        ...state,
        loggedInUser: undefined,
        accountCreationError: undefined,
        creatingAccount: true,
        accountCreated: false,
      };
    case 'create-account-success':
      return {
        ...state,
        accountCreationError: undefined,
        creatingAccount: false,
        accountCreated: true,
      };
    case 'create-account-failure':
      return {
        ...state,
        accountCreationError: action.data.err,
        creatingAccount: false,
        accountCreated: false,
      };
    case 'create-account-reset':
      return {
        ...state,
        accountCreationError: undefined,
        accountCreated: false,
      };
    case 'login-success':
      return {
        ...state,
        page: 'browse',
        apiClient: new GQLAPIClient(action.data.token),
        loggedInUser: {
          username: action.data.username,
          token: action.data.token,
        },
        loginError: undefined,
      };
    case 'login-failure':
      return {
        ...state,
        page: 'login',
        loggedInUser: undefined,
        apiClient: new GQLAPIClient(),
        loginError: action.data.err,
      };
    case 'list-items':
      return {
        ...state,
        itemsLoading: true,
      };
    case 'list-items-success':
      return {
        ...state,
        itemsLoading: false,
        items: action.items,
      };
    case 'list-items-failure':
      return {
        ...state,
        itemsLoading: false,
      };
    case 'add-to-cart':
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.itemId]: (state.cart[action.itemId] || 0) + action.qty,
        },
      };
    case 'nav':
      return {
        ...state,
        page: action.page,
      };
    case 'edit-order':
      return {
        ...state,
        page: 'order',
        orderId: action.orderId,
      };
    case 'logout':
      return {
        ...state,
        loggedInUser: undefined,
        apiClient: new GQLAPIClient(),
        cart: {},
        page: 'login',
      };
    default:
      return state;
  }
}
