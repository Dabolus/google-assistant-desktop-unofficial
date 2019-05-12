import { container } from '@helpers/di.helper';
import { L10n, L10nService } from '@services/l10n.service';
import { Modals, ModalsService } from '@services/modals.service';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  AppActionOpenModalRequested,
  AppActionType,
  AppActionUpdateLocaleRequested,
  rejectLocaleUpdate,
  rejectModalOpening,
  resolveLocaleUpdate,
  resolveModalOpening,
} from './app.actions';

const l10nService: L10n = container.get(L10nService);
const modalsService: Modals = container.get(ModalsService);

function* handleLocaleUpdate({
  payload: { locale },
}: AppActionUpdateLocaleRequested) {
  try {
    const data = yield call(l10nService.loadLocale, locale);
    yield put(resolveLocaleUpdate(data));
  } catch (e) {
    yield put(rejectLocaleUpdate(e));
  }
}

function* handleModalOpening({
  payload: { ref },
}: AppActionOpenModalRequested) {
  try {
    yield call(modalsService.open, ref);
  } catch (e) {
    yield put(rejectModalOpening(e));
  }
}

export const appSagas = [
  takeLatest(AppActionType.UPDATE_LOCALE_REQUESTED, handleLocaleUpdate),
  takeLatest(AppActionType.OPEN_MODAL_REQUESTED, handleModalOpening),
];
