import { keyAppState, keyAppStateVersion } from './constants';
import { version, AppState } from '../app-state/state';
import { GQLAPIClient } from '../api-client/gql-api-client';

export function storedOnDisk() {
  const storedVersion = localStorage.getItem(keyAppStateVersion);
  if (storedVersion !== String(version)) {
    return null;
  }

  const stored = localStorage.getItem(keyAppState);
  if (!stored) {
    return null;
  }

  try {
    const storedAppState: Partial<AppState> = JSON.parse(stored);
    const token =
      storedAppState && storedAppState.loggedInUser && storedAppState.loggedInUser.token;
    if (token) {
      storedAppState.apiClient = new GQLAPIClient(token);
    }
    return storedAppState;
  } catch (err) {
    return null;
  }
}
