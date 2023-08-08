/* eslint-disable import/no-extraneous-dependencies */
import 'reflect-metadata';
import 'dotenv/config';

import { Container } from 'inversify';
import AuthentificationServiceInterface from './domain/auth/service/AuthentificationServiceInterface';
import { TYPES } from '../config/constants/types';
import AuthRepositoryInterface from './domain/auth/repository/AuthRepositoryInterface';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as express from 'express';
import cors from 'cors';
import AuthRepository from './domain/auth/repository/AuthRepository';
import AuthentificationService from './domain/auth/service/AuthentificationService';

import './http/controllers/AuthController';
import MongoDBConnect from './infrastructure/odm/MongoDBConnect';
import { ErrorMiddleware } from './http/middleware/ErrorMiddleware';

const container = new Container();

container
  .bind<AuthentificationServiceInterface>(
    TYPES.AuthentificationServiceInterface,
  )
  .to(AuthentificationService);
container
  .bind<AuthRepositoryInterface>(TYPES.AuthRepositoryInterface)
  .to(AuthRepository);
container.bind(MongoDBConnect).toSelf();

const db = container.get(MongoDBConnect);
db.connect();

const server = new InversifyExpressServer(container);

server.setErrorConfig((application: express.Application) => {
  application.use(
    (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ): void => {
      ErrorMiddleware.execute(err, req, res, next);
    },
  );
});

server.setConfig((application: express.Application) => {
  application.use(express.json({ limit: '1mb' }));
  application.use(express.urlencoded({ extended: true, limit: '1mb' }));
  application.use(express.static(__dirname + 'public'));
  application.use(cors());
});

export default server;
