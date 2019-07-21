import * as React from 'react';

interface Props {
  cents: number;
}

export const Price: React.FunctionComponent<Props> = ({ cents }) => (
  <span>
    <span>${Math.floor(cents / 100)}</span>.<span>{cents % 100}</span>
  </span>
);
