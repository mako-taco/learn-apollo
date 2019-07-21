import * as React from 'react';
import { APIClient } from '../api-client/api-client';
import { AppActions } from '../app-state/actions';
import { responseOk } from '../api-client/utils';

interface LoginFormProps {
  dispatch: React.Dispatch<AppActions>;
  initialUsername?: string;
  apiClient: APIClient;
}

export const LoginForm: React.FunctionComponent<LoginFormProps> = ({
  initialUsername,
  dispatch,
  apiClient,
}) => {
  const [username, updateUsername] = React.useState(initialUsername || '');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'login' });
    try {
      const res = await responseOk(apiClient.login(username));
      dispatch({ type: 'login-success', data: { username, token: res.result } });
    } catch (err) {
      dispatch({ type: 'login-failure', data: { username, err } });
      return;
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>Log in:</div>
        <div>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={e => updateUsername(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};
