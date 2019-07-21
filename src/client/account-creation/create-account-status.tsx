import * as React from 'react';

interface CreateAccountStatusProps {
  error?: Error;
  success?: boolean;
}

export const CreateAccountStatus: React.FunctionComponent<CreateAccountStatusProps> = ({
  error,
  success,
}) =>
  success ? (
    <div>Account created!</div>
  ) : error ? (
    <div>
      <div>There was an error creating the account.</div>
      <div>{error.message}</div>
    </div>
  ) : (
    <></>
  );
