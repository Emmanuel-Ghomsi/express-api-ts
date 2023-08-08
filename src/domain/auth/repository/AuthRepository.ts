/* eslint-disable import/no-extraneous-dependencies */
import { injectable } from 'inversify';
import AuthRepositoryInterface from './AuthRepositoryInterface';
import { AuthSchema } from '../schema/AuthSchema';
import UserModel, { User } from '../entity/User';
import { SignupDTO } from '../dto/AuthDTO';
import { Types } from 'mongoose';

@injectable()
export default class AuthRepository implements AuthRepositoryInterface {
  fetch(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findOneByEmail(email: AuthSchema['email']): Promise<
    | (User & {
        _id: Types.ObjectId;
      })
    | null
  > {
    return UserModel.findOne({ email: email })
      .then((entity) => entity)
      .catch(() => null);
  }

  create(input: SignupDTO): Promise<
    User & {
      _id: Types.ObjectId;
    }
  > {
    return UserModel.create(input);
  }
}
