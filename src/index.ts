import Logger from './infrastructure/logger/Logger';
import server from './server';

const app = server.build();

app.listen(process.env.PORT, () => {
  Logger.debug(`Lancement du serveur sur le port : ${process.env.PORT}`);
});
