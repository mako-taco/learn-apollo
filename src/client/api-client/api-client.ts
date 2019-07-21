import { Item } from './schema.codegen';

export type AuthToken = string;

export interface APIErrorRespose {
  errors: string[];
  humanReadableError?: string;
}
export interface APISuccessResponse<T> {
  result: T;
}
export type APIResponse<T> = APISuccessResponse<T> | APIErrorRespose;
export type APIResponsePromise<T> = Promise<APIResponse<T>>;

export interface APIClient {
  login(username: string): APIResponsePromise<AuthToken>;
  createUser(username: string): APIResponsePromise<string>;
  items(ids?: string[]): APIResponsePromise<Item[]>;
}
