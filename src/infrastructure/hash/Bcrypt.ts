/* eslint-disable @typescript-eslint/return-await */
import bcrypt from 'bcrypt';

export default class Bcrypt {
  public static async generateSalt(): Promise<string> {
    return await bcrypt.genSalt();
  }

  public static async hashPassword(
    password: string,
    salt: string,
  ): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  public static async comparePassword(
    enteredPassword: string,
    savedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, savedPassword);
  }
}
