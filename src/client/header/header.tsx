import * as React from 'react';
import { withStateValue } from '../app-state/state-provider';
import { CartBadge } from '../cart/cart-badge';

const menuItemStyle = {
  padding: 8,
  marginBottom: 12,
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
};

export const Header: React.FunctionComponent = () =>
  withStateValue(({ state, dispatch }) => (
    <header style={headerStyle}>
      {state.loggedInUser ? <LoggedInHeader /> : <LoggedOutHeader />}
      <a style={menuItemStyle} onClick={e => dispatch({ type: 'edit-order', orderId: undefined })}>
        <CartBadge />
      </a>
    </header>
  ));

const LoggedInHeader = () =>
  withStateValue(({ state, dispatch }) => (
    <>
      <a style={menuItemStyle} onClick={e => dispatch({ type: 'nav', page: 'order-history' })}>
        Your orders
      </a>
      <a style={menuItemStyle} onClick={e => dispatch({ type: 'logout' })}>
        Log out
      </a>
    </>
  ));

const LoggedOutHeader = () => <></>;
