import { container } from '@helpers/di.helper';
import { Auth, AuthService } from '@services/auth.service';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AuthActionAuthenticateRequested, AuthActionType, rejectAuthentication, resolveAuthentication } from './auth.actions';

const authService: Auth = container.get(AuthService);

function* handleUserAuthentication({
  payload: { clientId, clientSecret },
}: AuthActionAuthenticateRequested) {
  try {
    yield call(authService.authenticate, clientId, clientSecret);
    yield put(resolveAuthentication());
  } catch (e) {
    yield put(rejectAuthentication(e));
  }
}

export const authSagas = [
  takeLatest(AuthActionType.AUTHENTICATE_REQUESTED, handleUserAuthentication),
];
