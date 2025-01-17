export enum OutputErrorEnum {
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  FORBIDDEN = 'FORBIDDEN',
}

export enum OutputErrorMsg {
  UNKNOWN_ERROR = 'An error occurred',
  NOT_FOUND = 'Not found',
  UNAUTHENTICATED = 'User is not unauthenticated',
  FORBIDDEN = 'User has not permissions',
}
