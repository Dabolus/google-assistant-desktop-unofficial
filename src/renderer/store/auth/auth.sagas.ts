import { container } from '@helpers/di.helper';
import { Auth, AuthService } from '@services/auth.service';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AuthActionAuthenticateRequested, AuthActionType, resolveAuthentication } from './auth.actions';

const authService: Auth = container.get(AuthService);

function* handleUserAuthentication({
  payload: { clientId, clientSecret },
}: AuthActionAuthenticateRequested) {
  const req = yield call(authService.authenticate, clientId, clientSecret);
  console.log('req', req);
  yield put(resolveAuthentication());
}

function* authenticate() {
  yield takeLatest(AuthActionType.AUTHENTICATE_REQUESTED, handleUserAuthentication);
}

export const authSagas = [
  authenticate,
];
