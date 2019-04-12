import { appSagas } from '../app/app.sagas';
import { authSagas } from '../auth/auth.sagas';

export const rootSagas = [
  ...appSagas,
  ...authSagas,
];
