export enum OutputErrorEnum {
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  FORBIDDEN = 'FORBIDDEN',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  CHECK_LOGIN_CREDENTIALS = 'CHECK_LOGIN_CREDENTIALS',
}

export enum OutputErrorMsg {
  UNKNOWN_ERROR = 'An error occurred',
  NOT_FOUND = 'Not found',
  UNAUTHENTICATED = 'User is not unauthenticated',
  FORBIDDEN = 'User has not permissions',
  EMAIL_ALREADY_EXISTS = 'email already exists',
  CHECK_LOGIN_CREDENTIALS = 'please check your login credentials',
}
