import { all } from 'redux-saga/effects';
import { appSagas } from '../app/app.sagas';
import { authSagas } from '../auth/auth.sagas';

export function* rootSaga() {
  yield all([
    ...appSagas,
    ...authSagas,
  ]);
}
