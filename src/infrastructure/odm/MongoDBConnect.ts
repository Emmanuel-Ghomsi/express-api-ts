/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-extraneous-dependencies */
import { injectable } from 'inversify';
import mongoose from 'mongoose';
import { Environment } from '../../../config/constants/environment';
import Logger from '../logger/Logger';

@injectable()
export default class MongoDBConnect {
  connect() {
    if (process.env.NODE_ENV === Environment.development)
      mongoose
        .connect(`${process.env.DB_URI}_dev`)
        .then(() => Logger.debug('Connect development DBB'))
        .catch((err) => Logger.error(err));
    else if (process.env.NODE_ENV === Environment.staging)
      mongoose
        .connect(`${process.env.DB_URI}_staging`)
        .then(() => Logger.debug('Connect staging DBB'))
        .catch((err) => Logger.error(err));
    else
      mongoose
        .connect(process.env.DB_URI!)
        .then(() => Logger.debug('Connect DBB'))
        .catch((err) => Logger.error(err));
  }
}
