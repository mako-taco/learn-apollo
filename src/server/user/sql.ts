import { IQueryable } from '../database/database';

interface User {
  id: number;
  username: string;
}

export async function createUser(db: IQueryable<User>, username: string): Promise<number> {
  const insertResult = await db.query('INSERT INTO users (username) VALUES ($1) RETURNING id', [
    username,
  ]);
  return insertResult.rows[0].id;
}

export async function getIdForUsername(db: IQueryable<User>, username: string): Promise<number> {
  const qresult = await db.query('SELECT id FROM users WHERE username = $1', [username]);
  if (qresult.rows.length !== 1) {
    throw new Error(`No user with username \`${username}\` found`);
  }

  return qresult.rows[0].id;
}
