export enum OutputErrorEnum {
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  FORBIDDEN = 'FORBIDDEN',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',
  CHECK_LOGIN_CREDENTIALS = 'CHECK_LOGIN_CREDENTIALS',
  REFRESH_EXPIRED_TOKEN = 'REFRESH_EXPIRED_TOKEN',
  INVALID_EXPIRED_TOKEN = 'INVALID_EXPIRED_TOKEN',
}

export enum OutputErrorMsg {
  UNKNOWN_ERROR = 'An error occurred',
  NOT_FOUND = 'Not found',
  UNAUTHENTICATED = 'User is not unauthenticated',
  FORBIDDEN = 'User has not permissions',
  USER_NOT_FOUND = 'User not found',
  EMAIL_ALREADY_EXISTS = 'email already exists',
  CHECK_LOGIN_CREDENTIALS = 'please check your login credentials',
  REFRESH_EXPIRED_TOKEN = 'Refresh expired token',
  INVALID_EXPIRED_TOKEN = 'Invalid expired token',
}
