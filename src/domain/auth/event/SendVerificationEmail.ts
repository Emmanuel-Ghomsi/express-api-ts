/* eslint-disable import/no-extraneous-dependencies */
import EventEmitter from 'events';
import { User } from '../entity/User';
import Jwt from '../../../infrastructure/jwt/Jwt';
import { Types } from 'mongoose';
import VerifyEmailTemplate from '../mail/VerifyEmailTemplate';
import NodemailerService from '../../../infrastructure/mail/NodemailerService';
import { ApiResponse } from '../../../../config/constants/ApiResponse';

export default class SendVerificationEmail extends EventEmitter {
  constructor() {
    super();
    this.on(
      'registration',
      (
        user: User & {
          _id: Types.ObjectId;
        },
      ) => {
        this.sendEmailVerification(user);
      },
    );
  }

  emitSendVerificationEmail(
    user: User & {
      _id: Types.ObjectId;
    },
  ) {
    this.emit('registration', user);
  }

  async sendEmailVerification(
    user: User & {
      _id: Types.ObjectId;
    },
  ) {
    const token = await Jwt.generateSignature(
      {
        email: user.email,
        id: user._id,
      },
      '1d',
    );

    /**
     * Send Mail
     *
     * - format message
     * - get instance from mail service
     * - send mail
     */
    const message = VerifyEmailTemplate(
      user.name,
      `${process.env.WEB_VERIFY_URL}/${token}`,
      process.env.SUPPORT_EMAIL,
    );

    const mailService = await NodemailerService.getInstance();

    await mailService.sendMail({
      to: user.email,
      subject: ApiResponse.VERIFICATION_EMAIL_SUBJECT,
      text: message.text,
      html: message.html,
    });
  }
}
