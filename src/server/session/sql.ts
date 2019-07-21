import { IQueryable } from '../database/database';
import { randomID } from '../../shared/random/random-id';
import { Time } from '../../shared/time/time';

interface Session {
  userId: number;
  token: string;
  expires: number;
}

export async function createSession(
  db: IQueryable<Session>,
  userId: number,
  tokenLength = 32,
  expires: number = Date.now() + Time.minutes(60)
): Promise<string> {
  const token = randomID(tokenLength);
  const insertResult = await db.query(
    'INSERT INTO sessions (user_id, token, expires) VALUES ($1, $2, $3)',
    [userId, token, expires]
  );
  if (insertResult.rowCount !== 1) {
    throw new Error(`Expected rowCount of 1 after session insert, got ${insertResult.rowCount}`);
  }

  return token;
}

interface UsernameSession {
  username: string;
  token: string;
  expires: string;
  userId: number;
}

export async function getUsernameForSessionToken(
  db: IQueryable<UsernameSession>,
  token: string,
  timestamp: number = Date.now(),
  refreshExpiration: number | false = Date.now() + Time.minutes(60)
): Promise<string | null> {
  const selectResult = await db.query(
    `
    SELECT
      sessions.user_id as userId,
      sessions.token,
      sessions.expires,
      users.username
    FROM sessions
    INNER JOIN users
      ON sessions.user_id = users.id
    WHERE token = $1
      AND sessions.expires > $2
    RETURNING user_id`,
    [token, timestamp]
  );

  // Validate
  if (selectResult.rows.length !== 1) {
    return null;
  }

  const { userId, username } = selectResult.rows[0];

  // Clear old sessions for user
  await db.query('DELETE FROM sessions WHERE user_id = $1 AND expires < $2', [userId, timestamp]);

  // Update expiration
  if (refreshExpiration !== false) {
    await db.query('UPDATE sessions SET expires = $1 WHERE token = $2', [refreshExpiration, token]);
  }

  return username;
}
