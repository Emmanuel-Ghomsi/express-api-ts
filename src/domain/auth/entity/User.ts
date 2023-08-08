/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable import/no-extraneous-dependencies */
import {
  DocumentType,
  Severity,
  getModelForClass,
  modelOptions,
  pre,
  prop,
} from '@typegoose/typegoose';
import Bcrypt from '../../../infrastructure/hash/Bcrypt';

@pre<User>('save', async function () {
  if (!this.isModified('password')) return;

  const hash = await Bcrypt.hashPassword(
    this.password,
    await Bcrypt.generateSalt(),
  );
  this.password = hash;

  return;
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class User {
  @prop({ required: true, minlength: 3 })
  name: string;

  @prop({ lowercase: true, required: true, unique: true })
  email: string;

  @prop({ required: true, minlength: 6 })
  password: string;

  @prop()
  emailVerifiedAt: Date | null;

  @prop()
  lastLoginAt: Date | null;

  @prop({ required: true, default: ['user'] })
  roles: string[];

  async validatePassword(
    this: DocumentType<User>,
    enteredPassword: string,
  ): Promise<boolean> {
    return await Bcrypt.comparePassword(enteredPassword, this.password);
  }
}

const UserModel = getModelForClass(User);

export default UserModel;
