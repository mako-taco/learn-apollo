import { keyAppState, keyAppStateVersion } from './constants';
import { version, AppState } from '../app-state/state';

export function storeOnDisk<S, A>(reducer: React.Reducer<S, A>) {
  return (state: S, action: A) => {
    const nextState = reducer(state, action);
    const storeState: Partial<AppState> = {
      ...nextState,
      apiClient: undefined,
    };
    localStorage.setItem(keyAppState, JSON.stringify(storeState));
    localStorage.setItem(keyAppStateVersion, String(version));
    return nextState;
  };
}
