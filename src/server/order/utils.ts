import { OrderWithItemDetails } from './sql';
import { GQLOrder, GQLOrderItem, GQLItem } from '../graph-ql/schema.codegen';

/**
 * Transforms OrderWithItemDetails[] into GQLOrder[]
 */
export function mapOrdersWithItemDetailsToGQL(
  ordersWithItemDetails: OrderWithItemDetails[]
): GQLOrder[] {
  const itemsById = ordersWithItemDetails.reduce<{ [key: number]: GQLItem }>((acc, row) => {
    if (!acc[row.itemId]) {
      acc[row.itemId] = {
        id: String(row.itemId),
        title: row.title,
        description: row.description,
        stock: row.stock,
        price: row.price,
      };
    }
    return acc;
  }, {});

  const orderItemsByOrderId = ordersWithItemDetails.reduce<{ [key: number]: GQLOrderItem[] }>(
    (acc, row) => {
      const orderItem: GQLOrderItem = {
        item: itemsById[row.itemId],
        qty: row.qty,
      };

      if (!acc[row.orderId]) {
        acc[row.orderId] = [];
      }
      acc[row.orderId].push(orderItem);
      return acc;
    },
    {}
  );

  const ordersById = ordersWithItemDetails.reduce<{ [key: number]: GQLOrder }>((acc, row) => {
    if (!acc[row.orderId]) {
      acc[row.orderId] = {
        id: String(row.orderId),
        items: orderItemsByOrderId[row.orderId],
        timestamp: row.timestamp,
      };
    }
    return acc;
  }, {});

  return Object.values(ordersById);
}
