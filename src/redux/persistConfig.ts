import { createBlacklistFilter } from 'redux-persist-transform-filter';
import storage from 'redux-persist-indexeddb-storage';
// import storage from 'redux-persist/lib/storage';

const saveAccountsFilter = createBlacklistFilter('accountsRecords', [
  'accountsRequestStatus',
  'accountsRequestError'
]);

// export const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['accountsRecords'],
//   transforms: [saveAccountsFilter]
// };

export const persistConfig = {
  key: 'root',
  storage: storage('chart-of-accounts-db'),
  whitelist: ['accountsRecords'],
  transforms: [saveAccountsFilter]
};
