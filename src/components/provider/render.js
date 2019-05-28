import property from 'lodash/property';
import React, { useMemo } from 'react';
import { Provider as Redux } from 'react-redux';
import { PersistGate as ReduxPersist } from 'redux-persist/integration/react';

import { TESTING } from 'constants/index';
import { data as getStore } from 'store';

export default ({ identity, children }) => {
  const [store, persistor] = useMemo(() => getStore({ key: identity }), [
    identity,
  ]);
  const Persistence = TESTING ? property('children') : ReduxPersist;

  return (
    <Redux store={store}>
      <Persistence persistor={persistor} loading="Loading...">
        {children}
      </Persistence>
    </Redux>
  );
};