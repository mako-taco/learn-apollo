import { IQueryable } from '../database/database';

declare global {
  namespace Express {
    interface Request {
      db: Promise<IQueryable<any, any>>;
      user(): Promise<{ username: string; token: string }>;
      _user: Promise<{ username: string; token: string }>;
    }
  }
}
