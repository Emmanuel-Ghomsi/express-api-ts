/* eslint-disable import/no-extraneous-dependencies */
import { inject, injectable } from 'inversify';
import AuthentificationServiceInterface from './AuthentificationServiceInterface';
import AuthRepositoryInterface from '../repository/AuthRepositoryInterface';
import { TYPES } from '../../../../config/constants/types';
import { SignupDTO } from '../dto/AuthDTO';
import { ApiResponse } from '../../../../config/constants/ApiResponse';
import SendVerificationEmail from '../event/SendVerificationEmail';
import { DuplicateEntryException } from '../../../http/exception';

@injectable()
export default class AuthentificationService
  implements AuthentificationServiceInterface
{
  private readonly userRepository: AuthRepositoryInterface;

  constructor(
    @inject(TYPES.AuthRepositoryInterface)
    userRepository: AuthRepositoryInterface,
  ) {
    this.userRepository = userRepository;
  }

  signin(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async signup(input: SignupDTO): Promise<void> {
    const existingUser = await this.userRepository.findOneByEmail(input.email);

    if (existingUser)
      throw new DuplicateEntryException(ApiResponse.DUPLICATE_USER);

    const user = await this.userRepository.create(input);

    const event = new SendVerificationEmail();

    event.emitSendVerificationEmail(user);
  }
}
