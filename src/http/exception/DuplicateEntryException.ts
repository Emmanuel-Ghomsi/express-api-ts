import HttpResponse from '../../../config/constants/HttpResponse';

export class DuplicateEntryException extends Error {
  public statusMessage: string;

  constructor(message: string) {
    super(message);
    this.statusMessage = HttpResponse.BAD_REQUEST;
  }
}
