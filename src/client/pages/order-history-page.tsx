import * as React from 'react';
import { withStateValue } from '../app-state/state-provider';
import { renderIf } from '../react-utils/render-if';

export const OrderHistoryPage = () =>
  withStateValue(({ state }) =>
    renderIf(state.page === 'order-history', <div>OrderHistoryPage</div>)
  );
