import { IQueryable } from '../database/database';

export interface GQLContext {
  //tslint:disable-next-line:no-any
  db: Promise<IQueryable<any, any>>;
}
