import { AppActions } from './actions';
import { APIClient } from '../api-client/api-client';
import { GQLAPIClient } from '../api-client/gql-api-client';
import { Item } from '../api-client/schema.codegen';

export const version = 1;

export type AppPage = 'login' | 'order' | 'order-history' | 'browse';

export interface AppState {
  apiClient: APIClient;
  page: AppPage;
  creatingAccount: boolean;
  accountCreationError?: Error;
  accountCreated?: boolean;
  loginError?: Error;
  loggedInUser?: {
    username: string;
    token: string;
  };
  items: Item[];
  itemsLoading?: boolean;
  cart: { [itemId: string]: number };
  orderId?: string;
}

export const initialState: AppState = {
  page: 'login',
  creatingAccount: false,
  apiClient: new GQLAPIClient(),
  items: [],
  cart: {},
};

export interface AppContext {
  state: AppState;
  dispatch: React.Dispatch<AppActions>;
}
