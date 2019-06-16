export interface UserInfo {
  name: string;
  surname: string;
  displayName: string;
  picture: string;
}

export interface AuthState {
  clientId: string;
  clientSecret: string;
  userPicture: string;
  userName: string;
  userSurname: string;
  userDisplayName: string;
  authenticated: boolean;
  error: Error;
}
