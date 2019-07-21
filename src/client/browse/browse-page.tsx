import * as React from 'react';
import { withStateValue } from '../app-state/state-provider';
import { renderIf } from '../react-utils/render-if';
import { responseOk } from '../api-client/utils';
import { BrowseItem } from '../browse/browse-item';

export const BrowsePage: React.FunctionComponent = () =>
  withStateValue(({ state, dispatch }) => {
    React.useEffect(() => {
      dispatch({ type: 'list-items' });
      responseOk(state.apiClient.items())
        .then(allItems => dispatch({ type: 'list-items-success', items: allItems.result }))
        .catch(err => dispatch({ type: 'list-items-failure', err }));
    }, [state.apiClient, dispatch]);
    return renderIf(
      state.page === 'browse',
      <>
        <div style={{ maxWidth: 600, display: 'flex' }}>
          <div style={{ maxWidth: 600, display: 'flex', flexDirection: 'column' }}>
            {state.items.map(item => (
              <BrowseItem
                title={item.title}
                price={item.price}
                dispatch={dispatch}
                key={item.id}
                id={item.id}
                description={item.description}
                inStock={item.stock === 0}
              />
            ))}
          </div>
        </div>
      </>
    );
  });
