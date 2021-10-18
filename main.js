const BotClient = require('./structures/botClient');
const appConfig = require('./util/appConfig.json')
const client = new BotClient({
  prefix: appConfig.configAkairo.prefix
});

require('dotenv').config()
client.login(process.env.TOKEN);


