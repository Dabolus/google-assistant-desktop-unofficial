export interface AuthState {
  clientId: string;
  clientSecret: string;
  authenticated: boolean;
  error: Error;
}
