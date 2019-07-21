import * as format from 'pg-format';
import { IQueryable } from '../database/database';

export interface OrderWithItemDetails {
  timestamp: number;
  itemId: number;
  orderId: number;
  title: string;
  description: string;
  stock: number;
  price: number;
  qty: number;
}

export async function getOrdersWithItemDetails(
  db: IQueryable<OrderWithItemDetails>,
  whereOptions: WhereOptions = {}
): Promise<OrderWithItemDetails[]> {
  const { where, args } = createWhereClause(whereOptions);
  const qresult = await db.query(
    `
    SELECT
      orders.timestamp,
      items.id as itemId,
      orders.id as orderId,
      items.title,
      items.description,
      items.stock,
      items.price,
      items_orders.qty
    FROM items
    INNER JOIN items_orders
    ON items.id = items_orders.item_id
    INNER JOIN orders
    ON orders.id = items_orders.order_id
    ${where}`,
    args
  );

  return qresult.rows;
}

export async function createOrder(
  db: IQueryable<OrderWithItemDetails>,
  userId: number,
  itemIds: number[],
  itemQtys: number[],
  timestamp: number
): Promise<number> {
  try {
    await db.query('BEGIN');
    const insert = await db.query(
      `
      INSERT INTO orders (user_id, timestamp)
      VALUES ($1, $2)
      RETURNING *`,
      [userId, timestamp]
    );
    const order = insert.rows[0];
    const valsToInsert = itemIds.map((itemId, i) => [itemId, order.orderId, itemQtys[i]]);
    await db.query(
      format(
        `
      INSERT INTO items_orders (item_id, order_id, qty)
      VALUES %L`,
        valsToInsert
      )
    );
    await db.query('COMMIT');
    return order.orderId;
  } catch (err) {
    await db.query('ROLLBACK');
    throw err;
  }
}

export interface WhereOptions {
  orderId?: number;
  userId?: number;
}

//tslint:disable:no-any
function createWhereClause(whereOptions: WhereOptions): { where: string; args: any[] } {
  const clauses: string[] = [];
  const args: any[] = [];

  function pushArg(arg: any): string {
    args.push(arg);
    return `$${args.length}`;
  }

  if (whereOptions.userId !== undefined) {
    clauses.push(`orders.user_id = ${pushArg(whereOptions.userId)}`);
  }

  if (whereOptions.orderId !== undefined) {
    clauses.push(`orders.id = ${pushArg(whereOptions.orderId)}`);
  }

  const where = clauses.length > 0 ? `\nWHERE ${clauses.join('\n\tAND')}` : '';
  return { where, args };
}
//tslint:enable:no-any
