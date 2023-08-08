import { TypeOf, object, string } from 'zod';
import { ApiResponse } from '../../../../config/constants/ApiResponse';

export const AuthSignInDTO = object({
  body: object({
    email: string({ required_error: ApiResponse.UNKNOWN_EMAIL }).email(
      ApiResponse.UNVALID_EMAIL,
    ),
    password: string({ required_error: ApiResponse.UNKNOWN_PASSWORD }).min(
      6,
      ApiResponse.MINIMAL_PASSWORD_LENGTH,
    ),
  }),
});

export const AuthSignUpDTO = object({
  body: object({
    name: string({ required_error: ApiResponse.UNKNOWN_NAME }),
    email: string({ required_error: ApiResponse.UNKNOWN_EMAIL }).email(
      ApiResponse.UNVALID_EMAIL,
    ),
    password: string({ required_error: ApiResponse.UNKNOWN_PASSWORD }).min(
      6,
      ApiResponse.MINIMAL_PASSWORD_LENGTH,
    ),
  }),
});

export type SigninDTO = TypeOf<typeof AuthSignInDTO>['body'];
export type SignupDTO = TypeOf<typeof AuthSignUpDTO>['body'];
