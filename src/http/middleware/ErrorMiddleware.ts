import { NextFunction, Request, Response } from 'express';
import { DuplicateEntryException } from '../exception/DuplicateEntryException';
import { NotFoundException, ValidationException } from '../exception';
import HttpCode from '../../../config/constants/HttpCode';
import Logger from '../../infrastructure/logger/Logger';
import HttpResponse from '../../../config/constants/HttpResponse';
import { BaseHttpResponse } from '../response/BaseHttpResponse';

export class ErrorMiddleware {
  public static execute(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    if (
      err instanceof ValidationException ||
      err instanceof DuplicateEntryException
    ) {
      const response = BaseHttpResponse.failed(
        err.message,
        err.statusMessage,
        HttpCode.UNPROCESSABLE_ENTITY,
      );

      Logger.error(
        `${response.error}: ${response.statusMessage} ${response.statusCode} `,
      );

      return res.status(response.statusCode).json(response);
    }

    if (err instanceof NotFoundException) {
      const response = BaseHttpResponse.failed(
        err.message,
        err.statusMessage,
        HttpCode.NOT_FOUND,
      );

      Logger.error(
        `${response.error}: ${response.statusMessage} ${response.statusCode} `,
      );

      return res.status(response.statusCode).json(response);
    }

    if (err instanceof Error) {
      const response = BaseHttpResponse.failed(
        err.message,
        HttpResponse.INTERNAL_SERVER_ERROR,
        HttpCode.INTERNAL_SERVER_ERROR,
      );

      Logger.error(
        `${response.error}: ${response.statusMessage} ${response.statusCode} `,
      );

      return res.status(response.statusCode).json(response);
    }

    next();
  }
}
