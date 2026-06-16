export const ERROR_CODES = {
  INTERNAL_SERVER_ERROR: 'internal/server-error',
  USER_NOT_FOUND: 'user/not-found',
  USER_ALREADY_EXISTS: 'user/already-exists',
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
