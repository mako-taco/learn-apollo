import * as React from 'react';
import { withStateValue } from '../app-state/state-provider';
import { Price } from './price';
import { Item } from '../api-client/schema.codegen';

export const CartBadge: React.FunctionComponent<{}> = () =>
  withStateValue(({ state }) => {
    const itemsById = React.useMemo(() => {
      return state.items.reduce<{ [itemId: string]: Item }>((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {});
    }, [state.items]);

    const totalItems = React.useMemo(
      () => Object.values(state.cart).reduce((total, qty) => total + qty),
      [state.cart]
    );

    const totalPrice = React.useMemo(() => {
      const itemsById = state.items.reduce<{ [itemId: string]: Item }>((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {});

      return Object.keys(state.cart)
        .map(itemId => itemsById[itemId].price * state.cart[itemId])
        .reduce((total, price) => total + price, 0);
    }, [state.cart, itemsById]);

    return (
      <div>
        <div>
          Cart: <span>{totalItems}</span> Items
        </div>
        <div>
          Total: <Price cents={totalPrice} />
        </div>
      </div>
    );
  });
