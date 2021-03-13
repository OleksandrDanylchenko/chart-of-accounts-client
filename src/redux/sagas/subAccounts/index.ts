import { all, call, put, takeLatest } from 'redux-saga/effects';
import log from 'loglevel';
import { fetchSubAccountsRoutine } from '../../routines';
import { fetchSubAccountsRequest } from '../../../services/requests/subAccounts';

function* fetchSubAccountsSaga() {
  try {
    const subAccountsResponse = yield call(fetchSubAccountsRequest);
    yield put(fetchSubAccountsRoutine.success(subAccountsResponse));
  } catch (error) {
    log.warn(error);
    yield put(fetchSubAccountsRoutine.failure(error));
  }
}

function* watchFetchSubAccountsSaga() {
  yield takeLatest(fetchSubAccountsRoutine.TRIGGER, fetchSubAccountsSaga);
}

export default function* subAccountsSagas() {
  yield all([watchFetchSubAccountsSaga()]);
}
