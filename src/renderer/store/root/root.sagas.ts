import { authSagas } from '../auth/auth.sagas';

export const rootSagas = [
  ...authSagas,
];
