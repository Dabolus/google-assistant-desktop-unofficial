import { container } from '@helpers/di.helper';
import { I18n, I18nService } from '@services/i18n.service';
import { Modals, ModalsService } from '@services/modals.service';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  AppActionOpenModalRequested,
  AppActionType,
  AppActionUpdateLocaleRequested,
  rejectLocaleUpdate,
  rejectModalOpening,
  resolveLocaleUpdate,
} from './app.actions';

const i18nService: I18n = container.get(I18nService);
const modalsService: Modals = container.get(ModalsService);

function* handleLocaleUpdate({
  payload: { locale },
}: AppActionUpdateLocaleRequested) {
  try {
    yield call([i18nService, 'loadLocale'], locale);
    yield put(resolveLocaleUpdate(locale));
  } catch (e) {
    yield put(rejectLocaleUpdate(e));
  }
}

function* handleModalOpening({
  payload: { ref },
}: AppActionOpenModalRequested) {
  try {
    yield call([modalsService, 'open'], ref);
  } catch (e) {
    yield put(rejectModalOpening(e));
  }
}

export const appSagas = [
  takeLatest(AppActionType.UPDATE_LOCALE_REQUESTED, handleLocaleUpdate),
  takeLatest(AppActionType.OPEN_MODAL_REQUESTED, handleModalOpening),
];
