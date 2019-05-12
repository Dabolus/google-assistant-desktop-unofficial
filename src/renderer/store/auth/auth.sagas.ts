import { container } from '@helpers/di.helper';
import { Auth, AuthService } from '@services/auth.service';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  AuthActionAuthenticateRequested,
  AuthActionType,
  rejectAuthentication,
  rejectLogout,
} from './auth.actions';

const authService: Auth = container.get(AuthService);

function* handleUserAuthentication({
  payload: { clientId, clientSecret },
}: AuthActionAuthenticateRequested) {
  try {
    yield call(authService.authenticate, clientId, clientSecret);
  } catch (e) {
    yield put(rejectAuthentication(e));
  }
}

function* handleUserLogout() {
  try {
    yield call(authService.logout);
  } catch (e) {
    yield put(rejectLogout(e));
  }
}

export const authSagas = [
  takeLatest(AuthActionType.AUTHENTICATE_REQUESTED, handleUserAuthentication),
  takeLatest(AuthActionType.LOGOUT_REQUESTED, handleUserLogout),
];
