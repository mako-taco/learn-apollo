import { IQueryable } from '../database/database';

export interface Item {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
}

export async function createItem(
  db: IQueryable<Item, {}>,
  title: string,
  description: string,
  initialStock: number,
  price: number
): Promise<Item> {
  const qresult = await db.query(
    `
  INSERT INTO items (title, description, stock, price)
  VALUES ($1::text, $2::text, $3, $4)
  RETURNING *
  `,
    [title, description, initialStock, price]
  );
  return qresult.rows[0];
}

export async function getItems<A>(
  db: IQueryable<Item, A>,
  whereOptions: WhereOptions = {}
): Promise<Item[]> {
  const { where, args } = createWhereClause(whereOptions);
  const qresult = await db.query(
    `
    SELECT
      id,
      title,
      description,
      stock,
      price
    FROM items
    ${where}`,
    args
  );

  return qresult.rows;
}

export interface WhereOptions {
  itemId?: number;
  itemIds?: number[];
}

//tslint:disable:no-any
function createWhereClause(whereOptions: WhereOptions): { where: string; args: any[] } {
  const clauses: string[] = [];
  const args: any[] = [];

  function pushArg(arg: any): string {
    args.push(arg);
    return `$${args.length}`;
  }

  if (whereOptions.itemId !== undefined) {
    clauses.push(`id = ${pushArg(whereOptions.itemId)}`);
  }

  if (whereOptions.itemIds !== undefined) {
    const replacers = whereOptions.itemIds.map(pushArg).join(',');
    clauses.push(`id IN (${replacers})`);
  }

  const where = clauses.length > 0 ? `\nWHERE ${clauses.join('\n\tAND')}` : '';
  return { where, args };
}
//tslint:enable:no-any
