import { GraphQLError } from 'graphql';
import { OutputErrorEnum, OutputErrorMsg } from './error.types';
import { TypeORMError } from 'typeorm';

export const throwNewGraphqlError = ({
  message,
  code,
}: {
  message: string;
  code: string | number;
}) => {
  throw new GraphQLError(message, { extensions: { code } });
};

export const handleError = (error: GraphQLError | TypeORMError) => {
  if (error instanceof GraphQLError) {
    switch (error?.message) {
      case OutputErrorMsg.FORBIDDEN:
        throw new GraphQLError(OutputErrorMsg.FORBIDDEN, {
          extensions: { code: OutputErrorEnum.FORBIDDEN },
        });

      case OutputErrorMsg.UNAUTHENTICATED:
        throw new GraphQLError(OutputErrorMsg.UNAUTHENTICATED, {
          extensions: { code: OutputErrorEnum.UNAUTHENTICATED },
        });

      case OutputErrorMsg.NOT_FOUND:
        throw new GraphQLError(OutputErrorMsg.NOT_FOUND, {
          extensions: { code: OutputErrorEnum.NOT_FOUND },
        });

      case OutputErrorMsg.EMAIL_ALREADY_EXISTS:
        throw new GraphQLError(OutputErrorMsg.EMAIL_ALREADY_EXISTS, {
          extensions: { code: OutputErrorEnum.EMAIL_ALREADY_EXISTS },
        });

      case OutputErrorMsg.CHECK_LOGIN_CREDENTIALS:
        throw new GraphQLError(OutputErrorMsg.CHECK_LOGIN_CREDENTIALS, {
          extensions: { code: OutputErrorEnum.CHECK_LOGIN_CREDENTIALS },
        });

      case OutputErrorMsg.USER_NOT_FOUND:
        throw new GraphQLError(OutputErrorMsg.USER_NOT_FOUND, {
          extensions: { code: OutputErrorEnum.USER_NOT_FOUND },
        });

      default:
        throw new GraphQLError(OutputErrorMsg.UNKNOWN_ERROR, {
          extensions: { code: OutputErrorEnum.UNKNOWN_ERROR },
        });
    }
  }
  throw new Error(error?.message);
};
