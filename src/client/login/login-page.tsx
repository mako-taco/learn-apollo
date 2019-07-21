import * as React from 'react';
import { withStateValue } from '../app-state/state-provider';
import { LoginForm } from '../login/login-form';
import { CreateAccountStatus } from '../account-creation/create-account-status';
import { CreateAccountForm } from '../account-creation/create-account-form';
import { renderIf } from '../react-utils/render-if';

const loginPageStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 300,
};

const horizRuleStyle: React.CSSProperties = {
  textAlign: 'center',
  width: '100%',
  marginTop: 10,
  marginBottom: 10,
};

export const LoginPage: React.FunctionComponent = () =>
  withStateValue(({ state, dispatch }) =>
    renderIf(
      state.page === 'login',
      <div style={loginPageStyle}>
        <div>
          <LoginForm dispatch={dispatch} initialUsername={''} apiClient={state.apiClient} />
          {state.loginError ? <div>Could not log in with that username.</div> : <></>}
          <hr style={horizRuleStyle} />
          <CreateAccountForm dispatch={dispatch} apiClient={state.apiClient} />
          <CreateAccountStatus error={state.accountCreationError} success={state.accountCreated} />
        </div>
      </div>
    )
  );
