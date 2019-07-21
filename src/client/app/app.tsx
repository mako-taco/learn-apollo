import * as React from 'react';
import { reducer } from '../app-state/reducer';
import { initialState } from '../app-state/state';
import { StateProvider } from '../app-state/state-provider';
import { LoginPage } from '../login/login-page';
import { OrderHistoryPage } from '../pages/order-history-page';
import { OrderPage } from '../pages/order-page';
import { BrowsePage } from '../browse/browse-page';
import { storeOnDisk } from '../persistance/store-on-disk';
import { storedOnDisk } from '../persistance/stored-on-disk';
import { Header } from '../header/header';

export class App extends React.PureComponent {
  public render() {
    return (
      <StateProvider
        initialState={{ ...initialState, ...storedOnDisk() }}
        reducer={storeOnDisk(reducer)}
      >
        <Header />
        <LoginPage />
        <OrderHistoryPage />
        <OrderPage />
        <BrowsePage />
      </StateProvider>
    );
  }
}
