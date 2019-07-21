import {
  GQLQueryTypeResolver,
  GQLOrder,
  GQLOrderItem,
  GQLOrderTypeResolver,
  GQLMutationTypeResolver,
} from '../graph-ql/schema.codegen';
import { getOrdersWithItemDetails, createOrder } from './sql';
import { mapOrdersWithItemDetailsToGQL } from './utils';
import { ValidationError } from 'apollo-server-core';

export const Query: Pick<GQLQueryTypeResolver, 'orders'> = {
  async orders(parent, args, ctx): Promise<GQLOrder[]> {
    const db = await ctx.db;
    const ordersWithItemDetails = await getOrdersWithItemDetails(db, { userId: args.userId });
    return mapOrdersWithItemDetailsToGQL(ordersWithItemDetails);
  },
};

export const Mutation: Pick<GQLMutationTypeResolver, 'createOrder'> = {
  async createOrder(parent, args, ctx): Promise<string> {
    const db = await ctx.db;
    if (args.itemIds.length !== args.itemQtys.length) {
      throw new ValidationError('itemIds and itemQtys must have the same length');
    }
    const userId = parseInt(args.userId, 10);

    // TODO auth
    if (isNaN(userId)) {
      throw new ValidationError(`Invalid user id: ${userId}`);
    }

    const orderId = await createOrder(
      db,
      userId,
      args.itemIds.map(id => parseInt(id, 10)),
      args.itemQtys.map(id => parseInt(id, 10)),
      Date.now()
    );

    return String(orderId);
  },
};

export const Order: GQLOrderTypeResolver = {
  async items(parent, args, ctx): Promise<GQLOrderItem[]> {
    const db = await ctx.db;
    const orderId = parseInt(parent.id, 10);
    const ordersWithItemDetails = await getOrdersWithItemDetails(db, { orderId });
    const gqlOrders = mapOrdersWithItemDetailsToGQL(ordersWithItemDetails);
    const gqlOrder = gqlOrders[0];
    return gqlOrder.items;
  },
};
