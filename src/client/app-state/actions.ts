import { Item } from '../api-client/schema.codegen';
import { AppPage } from './state';

export type AppActions =
  | { type: 'add-to-cart'; itemId: string; qty: number }
  | { type: 'list-items' }
  | { type: 'list-items-success'; items: Item[] }
  | { type: 'list-items-failure'; err: Error }
  | { type: 'nav'; page: AppPage }
  | { type: 'edit-order'; orderId?: string }
  | { type: 'logout' }
  | { type: 'login' }
  | { type: 'login-reset' }
  | { type: 'login-success'; data: { username: string; token: string } }
  | { type: 'login-failure'; data: { username: string; err: Error } }
  | { type: 'create-account'; data: { username: string } }
  | { type: 'create-account-success'; data: { username: string; token: string } }
  | { type: 'create-account-failure'; data: { username: string; err: Error } }
  | { type: 'create-account-reset' };
