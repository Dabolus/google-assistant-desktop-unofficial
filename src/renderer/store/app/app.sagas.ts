import { container } from '@helpers/di.helper';
import { L10n, L10nService } from '@services/l10n.service';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AppActionType, AppActionUpdateLocaleRequested, resolveLocaleUpdate } from './app.actions';

const l10nService: L10n = container.get(L10nService);

function* handleLocaleUpdate({
  payload: { locale },
}: AppActionUpdateLocaleRequested) {
  const data = yield call(l10nService.loadLocale, locale);
  yield put(resolveLocaleUpdate(data));
}

function* updateLocale() {
  yield takeLatest(AppActionType.UPDATE_LOCALE_REQUESTED, handleLocaleUpdate);
}

export const appSagas = [
  updateLocale,
];
