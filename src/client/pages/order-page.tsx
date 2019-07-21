import * as React from 'react';
import { withStateValue } from '../app-state/state-provider';
import { renderIf } from '../react-utils/render-if';
import { responseOk } from '../api-client/utils';
export const OrderPage = () =>
  withStateValue(({ state }) => renderIf(state.page === 'order', <Order />));

const Order: React.FunctionComponent = () =>
  withStateValue(({ state, dispatch }) => {
    React.useEffect(() => {
      const items = state.orderId === undefined ? Object.keys(state.cart) : [];
      dispatch({ type: 'list-items' });
      responseOk(state.apiClient.items(items))
        .then(allItems => dispatch({ type: 'list-items-success', items: allItems.result }))
        .catch(err => dispatch({ type: 'list-items-failure', err }));
    }, [state.orderId, state.cart]);

    return <div>Order Page</div>;
  });
