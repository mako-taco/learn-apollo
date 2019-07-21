import { Pool } from 'pg';
import { Request, Response, NextFunction } from 'express';

export class PGExpress {
  constructor(private readonly pool: Pool) {}

  public readonly middleware = (req: Request, res: Response, next: NextFunction) => {
    req.db = new Promise((resolve, reject) => {
      this.pool.connect((err, client, done) => {
        if (err) {
          reject(err);
          done();
          return;
        }

        res.once('close', done);
        resolve(client);
      });
    });
    next();
  }
}
