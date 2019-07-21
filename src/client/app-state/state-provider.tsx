import * as React from 'react';
import { AppState, AppContext } from './state';
import { AppActions } from './actions';

const { createContext, useReducer, useContext } = React;

export const StateContext = createContext<AppContext | null>(null);

interface Props<S, A> {
  reducer: React.Reducer<S, A>;
  initialState: S;
  children: React.ReactNode[];
}

export const StateProvider = ({ reducer, initialState, children }: Props<AppState, AppActions>) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>;
};

export const useStateValue = () => useContext(StateContext);

export function withStateValue(fn: (ctx: AppContext) => React.ReactElement): React.ReactElement {
  const stateVal = useStateValue();
  return stateVal === null ? <></> : fn(stateVal);
}
