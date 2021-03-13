import { all } from 'redux-saga/effects';
import accountsSagas from './accounts';
import syntheticAccountsSagas from './syntheticAccounts';
import subAccountsSagas from './subAccounts';

export default function* rootSaga() {
  yield all([accountsSagas(), syntheticAccountsSagas(), subAccountsSagas()]);
}
