export interface AuthSchema {
  _id: string;
  name: string;
  email: string;
  password: string;
  emailVerifiedAt: Date;
  lastLoginAt: Date;
  roles: Array<string>;
}
