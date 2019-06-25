import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';

import { NODH } from 'constants/index';
import getReducers from 'reducers';

const sign = signature =>
  [signature, window.location.host, NODH].filter(Boolean).join(' @ ');

const reconcile = reconciler => (current, _, next) => reconciler(current, next);

export default ({ signature, setInitialState, reconcileState }) => {
  const store = createStore(
    persistReducer(
      {
        whitelist: ['persisted'],
        key: sign(signature),
        ...(!!reconcileState && { stateReconciler: reconcile(reconcileState) }),
        storage,
      },
      getReducers({ format: setInitialState })
    ),
    composeWithDevTools({ name: 'Testing...' })
  );
  const persistor = persistStore(store);

  return [store, persistor];
};
