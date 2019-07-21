import { getItems, createItem } from './sql';
import { GQLQueryTypeResolver, GQLItem, GQLMutationTypeResolver } from '../graph-ql/schema.codegen';

export const Query: Pick<GQLQueryTypeResolver, 'items'> = {
  async items(parent, args, ctx): Promise<GQLItem[]> {
    const db = await ctx.db;
    const items = await getItems(db);
    return items.map(item => ({ ...item, id: String(item.id) }));
  },
};

export const Mutation: Pick<GQLMutationTypeResolver, 'createItem'> = {
  async createItem(parent, args, ctx): Promise<string> {
    const db = await ctx.db;
    const item = await createItem(db, args.title, args.description, args.initialStock, args.price);
    return String(item.id);
  },
};
