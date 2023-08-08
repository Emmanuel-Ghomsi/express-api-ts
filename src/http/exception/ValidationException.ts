import HttpResponse from '../../../config/constants/HttpResponse';

export class ValidationException extends Error {
  public statusMessage: string;

  constructor(message: string) {
    super(message);
    this.statusMessage = HttpResponse.FIELD_REQUIRED;
  }
}
