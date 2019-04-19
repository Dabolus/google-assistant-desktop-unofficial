import { all } from 'redux-saga/effects';
import { appSagas } from '../app/app.sagas';
import { authSagas } from '../auth/auth.sagas';
import { chatSagas } from '../chat/chat.sagas';

export function* rootSaga() {
  yield all([
    ...appSagas,
    ...authSagas,
    ...chatSagas,
  ]);
}
