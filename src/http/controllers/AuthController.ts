/* eslint-disable import/no-extraneous-dependencies */
import { inject } from 'inversify';
import {
  controller,
  httpGet,
  httpPost,
  interfaces,
  request,
  response,
} from 'inversify-express-utils';
import * as express from 'express';
import AuthentificationServiceInterface from '../../domain/auth/service/AuthentificationServiceInterface';
import { TYPES } from '../../../config/constants/types';
import { AuthSignUpDTO } from '../../domain/auth/dto/AuthDTO';
import ValidateRequestMiddleware from '../middleware/ValidateRequestMiddleware';
import HttpCode from '../../../config/constants/HttpCode';

@controller(`/${process.env.PREFIX_PATH}/auth`)
export default class AuthController implements interfaces.Controller {
  private readonly authService: AuthentificationServiceInterface;

  constructor(
    @inject(TYPES.AuthentificationServiceInterface)
    authService: AuthentificationServiceInterface,
  ) {
    this.authService = authService;
  }

  @httpGet('/')
  public async all(
    @request() req: express.Request,
    @response() res: express.Response,
  ) {
    return res.status(200).json({ message: 'ok' });
  }

  @httpPost('/signup', ValidateRequestMiddleware(AuthSignUpDTO))
  public async signup(
    @request() req: express.Request,
    @response() res: express.Response,
  ) {
    const body = req.body;
    await this.authService.signup(body);

    res.status(HttpCode.CREATED);
  }
}
