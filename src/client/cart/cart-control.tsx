import * as React from 'react';
import { AppActions } from '../app-state/actions';
import { Price } from './price';

export interface Props {
  itemId: string;
  price: number;
  dispatch: React.Dispatch<AppActions>;
}

export const CartControl: React.FunctionComponent<Props> = ({ itemId, price, dispatch }) => {
  const [qty, updateQty] = React.useState(0);
  return (
    <div>
      <span style={{ paddingRight: 5 }}>
        Total: <Price cents={price * qty} />
      </span>
      <span style={{ paddingRight: 5 }}>
        <button onClick={e => updateQty(Math.max(qty - 1, 0))}>-</button>
        {qty}
        <button onClick={e => updateQty(Math.max(qty + 1, 0))}>+</button>
      </span>
      <span style={{ paddingRight: 5 }}>
        <button onClick={e => dispatch({ type: 'add-to-cart', itemId, qty })}>Add to cart</button>
      </span>
    </div>
  );
};
