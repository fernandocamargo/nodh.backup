import { string, func, node } from 'prop-types';

export const displayName = 'NODH';

export const propTypes = {
  signature: string,
  setInitialState: func,
  reconcileState: func,
  children: node.isRequired,
};