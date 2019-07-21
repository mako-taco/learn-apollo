import * as React from 'react';
import { CartControl } from '../cart/cart-control';
import { AppActions } from '../app-state/actions';
import { Price } from '../cart/price';

export interface Props {
  id: string;
  title: string;
  price: number;
  description: string;
  inStock: boolean;
  dispatch: React.Dispatch<AppActions>;
}

export const BrowseItem: React.FunctionComponent<Props> = ({
  id,
  description,
  title,
  price,
  dispatch,
  inStock,
}) => (
  <div style={{ paddingBottom: 30 }}>
    <div style={{ fontWeight: 'bold' }}>{title}</div>
    <div>{description}</div>
    <div style={{ justifyContent: 'space-between', display: 'flex' }}>
      <div>
        <Price cents={price} />
      </div>
      {inStock ? (
        <div>Out of stock.</div>
      ) : (
        <CartControl dispatch={dispatch} itemId={id} price={price} />
      )}
    </div>
  </div>
);
