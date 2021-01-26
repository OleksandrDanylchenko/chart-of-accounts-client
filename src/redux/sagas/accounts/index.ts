import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchAccountsRequest } from '../../../services/requests';
import { fetchAccountsRoutine } from '../../routines';
import log from 'loglevel';

function* fetchAccountsSaga() {
  try {
    const accountsResponse = yield call(fetchAccountsRequest);
    yield put(fetchAccountsRoutine.success(accountsResponse));
  } catch (error) {
    log.warn(error);
    yield put(fetchAccountsRoutine.failure(error));
  }
}

function* watchFetchAccountsSaga() {
  yield takeLatest(fetchAccountsRoutine.TRIGGER, fetchAccountsSaga);
}

export default function* accountsSagas() {
  yield all([watchFetchAccountsSaga()]);
}
