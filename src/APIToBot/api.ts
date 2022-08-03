import express from 'express'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Guild, GuildMember, TextChannel } from "discord.js"
import { userValidateModel } from "./Model/UserValidatedModel"
import { client } from '../index'
import appConf from '../util/appConfig.json'
import appLang from '../util/language.json'
import { userOnServerModel } from './Model/userOnServerModel'


const cors = require('cors')

export const app = express();
function rawBody(req: any, res: any, next: any) {
  req.setEncoding('utf8');
  req.rawBody = '';
  req.on('data', function (chunk: any) {
    req.rawBody += chunk;
  });
  req.on('end', function () {
    next();
  });
}
app.use(rawBody);
app.use(cors({ origin: '*' }));

// Check if the user with {{userId}}
app.get("/isUserOnServer/:userId", async (req: express.Request, res: express.Response) => {
  const guild = await client.guilds.fetch(appConf.botConfig.guildid);
  let userOnServer = new userOnServerModel();
  await guild.members.fetch(req.params.userId)
    .then((user) => {
      userOnServer.isOnServeur = true;
      userOnServer.username = user.displayName;
    })
    .catch((reason) => {
      userOnServer.isOnServeur = false;
    });


  res.send(userOnServer);
});

// app.post("/test", async (req: express.Request, res: express.Response) => {
//   const guild = await client.guilds.fetch(appConf.botConfig.guildid);
//   const channel = await guild.channels.cache.get('902244087258828872') as TextChannel;

//   channel.send(req.body.message);
//   res.send(req.body.message);
// });

// Check if user on serveur and send on users are on the server dm with validation button and a message
app.post("/sendRegisterValidationButton/:userId", async (req: express.Request, res: express.Response) => {
  //Get params
  const user = new userValidateModel();


  user.userId = req.params.userId;
  user.token = (req as any).rawBody;


  // get guild
  const guild = await client.guilds.fetch(appConf.botConfig.guildid) as Guild

  let result = false;
  await guild.members.fetch(user.userId)
    .then((user) => {
      result = true;
    })
    .catch((reason) => {
      result = false;
    });
  if (!result) return res.status(400).send("L'utilisateur n'est pas sur le serveur");



  // get member on guild
  const member = guild.members.cache.get(user.userId) as GuildMember

  // Create button and message for validation 
  const btRegisterValidation = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
      new ButtonBuilder()
        .setURL(appConf.Api.RegisterValidationLink.format(user.userId, user.token))
        .setLabel("Valider l'inscription")
        .setStyle(ButtonStyle.Link)
    )
  // Send Button and Message in user's DM
  member.user.send({ content: "Vous pouvez maintenant validé votre inscription en cliquant sur le bouton suivant", components: [btRegisterValidation] })

  //log in channel
  const channel = await guild.channels.cache.get(appConf.chanels.staff.botLog) as TextChannel;
  channel.send(appLang.api.uservalidated.registered.format(user.userId));

  res.sendStatus(200);
})
