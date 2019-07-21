import * as React from 'react';
export function renderIf(expression: boolean, el: React.ReactElement): React.ReactElement {
  return expression ? el : <></>;
}
