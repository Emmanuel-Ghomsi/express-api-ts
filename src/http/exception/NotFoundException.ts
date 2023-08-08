import HttpResponse from '../../../config/constants/HttpResponse';

export class NotFoundException extends Error {
  public statusMessage: string;

  constructor(message: string) {
    super(message);
    this.statusMessage = HttpResponse.NOT_FOUND;
  }
}
