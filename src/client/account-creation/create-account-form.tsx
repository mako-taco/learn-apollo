import * as React from 'react';
import { responseOk } from '../api-client/utils';
import { AppActions } from '../app-state/actions';
import { APIClient } from '../api-client/api-client';

interface CreateAccountFormProps {
  dispatch: React.Dispatch<AppActions>;
  apiClient: APIClient;
}

export const CreateAccountForm: React.FunctionComponent<CreateAccountFormProps> = ({
  dispatch,
  apiClient,
}) => {
  const [newUsername, updateNewUsername] = React.useState('');
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'create-account', data: { username: newUsername } });
    try {
      const response = await responseOk(apiClient.createUser(newUsername));
      dispatch({
        type: 'create-account-success',
        data: { username: newUsername, token: response.result },
      });
    } catch (err) {
      dispatch({ type: 'create-account-failure', data: { username: newUsername, err } });
    } finally {
      setTimeout(() => dispatch({ type: 'create-account-reset' }), 5000);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>Create account:</div>
        <div>
          <input
            type="text"
            placeholder="New username"
            value={newUsername}
            onChange={e => updateNewUsername(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};
