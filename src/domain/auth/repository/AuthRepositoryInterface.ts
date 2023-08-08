/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
import { SignupDTO } from '../dto/AuthDTO';
import { User } from '../entity/User';
import { AuthSchema } from '../schema/AuthSchema';

export default interface AuthRepositoryInterface {
  fetch(): Promise<void>;
  findOneByEmail(email: AuthSchema['email']): Promise<
    | (User & {
        _id: Types.ObjectId;
      })
    | null
  >;
  create(input: SignupDTO): Promise<
    User & {
      _id: Types.ObjectId;
    }
  >;
}
