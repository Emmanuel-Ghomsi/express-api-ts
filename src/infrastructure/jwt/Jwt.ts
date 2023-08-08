/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request } from 'express';
import jwt from 'jsonwebtoken';

export default class Jwt {
  public static async generateSignature(
    payload: any,
    expireDate: string,
  ): Promise<string> {
    return await jwt.sign(payload, process.env.APP_SECRET_KEY!, {
      expiresIn: expireDate,
    });
  }

  public static verifyToken(token: string): any {
    return jwt.verify(token, process.env.APP_SECRET_KEY!);
  }

  public static decodeToken(token: string): any {
    return jwt.decode(token);
  }

  public static async validateSignature(req: Request) {
    const signature = req.get('Authorization');

    if (signature) {
      await jwt.verify(signature.split(' ')[1], process.env.APP_SECRET_KEY!);
      return true;
    }

    return false;
  }
}
