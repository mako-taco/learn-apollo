import { Request, Response, NextFunction } from 'express';
import { getUsernameForSessionToken } from './sql';
export class Authentication {
  private readonly noAuthErrorMsg: string;

  constructor(private readonly authHeader: string = 'X-Auth-Token') {
    this.noAuthErrorMsg = `Request is not authed - no value provided for ${this.authHeader}`;
  }

  public readonly middleware = async (req: Request, res: Response, next: NextFunction) => {
    req.user = () => {
      if (!req._user) {
        req._user = new Promise(async (resolve, reject) => {
          const db = await req.db;
          const bearerToken = req.header(this.authHeader);
          if (!bearerToken) {
            reject(new Error(this.noAuthErrorMsg));
            return;
          }
          const token = bearerToken.substring('Bearer '.length);
          const username = await getUsernameForSessionToken(db, token);
          if (username) {
            resolve({ username, token });
          } else {
            reject(new Error('Invalid session'));
          }
        });
      }
      return req._user;
    };
    next();
  }
}
