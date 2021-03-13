import { all, call, put, takeLatest } from 'redux-saga/effects';
import log from 'loglevel';
import { fetchSyntheticAccountsRoutine } from '../../routines';
import { fetchSyntheticAccountsRequest } from '../../../services/requests/syntheticAccounts';

function* fetchSyntheticAccountsSaga() {
  try {
    const syntheticAccountsResponse = yield call(fetchSyntheticAccountsRequest);
    yield put(fetchSyntheticAccountsRoutine.success(syntheticAccountsResponse));
  } catch (error) {
    log.warn(error);
    yield put(fetchSyntheticAccountsRoutine.failure(error));
  }
}

function* watchFetchSyntheticAccountsSaga() {
  yield takeLatest(
    fetchSyntheticAccountsRoutine.TRIGGER,
    fetchSyntheticAccountsSaga
  );
}

export default function* syntheticAccountsSagas() {
  yield all([watchFetchSyntheticAccountsSaga()]);
}
