import { all } from 'redux-saga/effects';
import accountsSagas from './accounts';

export default function* rootSaga() {
  yield all([accountsSagas()]);
}
