export interface IQueryable<T = {}, A = {}> {
  query(sql: string, args?: A[]): Promise<IQueryResult<T>>;
}

export interface IQueryResult<T> {
  oid: number;
  rowCount: number;
  rows: T[];
}
