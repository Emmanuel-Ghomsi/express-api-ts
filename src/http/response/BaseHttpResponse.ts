/* eslint-disable @typescript-eslint/default-param-last */
import HttpCode from '../../../config/constants/HttpCode';
import HttpResponse from '../../../config/constants/HttpResponse';

/* eslint-disable @typescript-eslint/no-explicit-any */
export class BaseHttpResponse {
  constructor(
    public readonly data: any = {},
    public readonly error: string | null = null,
    public readonly statusMessage: string,
    public readonly statusCode: number,
  ) {}

  static success(
    data: any,
    statusMessage = HttpResponse.OK,
    statusCode = HttpCode.OK,
  ) {
    return new BaseHttpResponse(data, null, statusMessage, statusCode);
  }

  static failed(
    msg: string,
    statusMessage: string,
    statusCode = HttpCode.BAD_REQUEST,
  ) {
    return new BaseHttpResponse(null, msg, statusMessage, statusCode);
  }
}
