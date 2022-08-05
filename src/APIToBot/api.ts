import express from 'express'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ColorResolvable, EmbedBuilder, Guild, GuildMember, Role, TextChannel } from "discord.js"
import { client } from '../index'
import appConf from '../util/appConfig.json'
import appLang from '../util/language.json'
import { UserOnServerModel } from './Model/UserOnServerModel'
import { UserValidateModel } from './Model/UserValidatedModel'
import { TokenValidationModel } from './Model/TokenValidationModel'
import { UserValidatedOnDBModel } from './Model/UserValidatedOnDBModel'
import { DefaultEmbed } from '../util/export'


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
  let userOnServer = new UserOnServerModel();
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

app.post("/test", async (req: express.Request, res: express.Response) => {
  const guild = await client.guilds.fetch(appConf.botConfig.guildid);
  const channel = await guild.channels.cache.get('1001952449252298792') as TextChannel;

  channel.send((req as any).rawBody);
  res.send((req as any).rawBody);
});

// Check if user on serveur and send on users are on the server dm with validation button and a message
app.post("/sendRegisterValidationButton/:userId", async (req: express.Request, res: express.Response) => {
  //Get params
  const user = new UserValidateModel();


  user.userId = req.params.userId;
  const jsonBody: TokenValidationModel = JSON.parse(((req as any).rawBody as string)) as TokenValidationModel;

  user.token = jsonBody.token;


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

  let embed = DefaultEmbed()
  embed.setColor(appLang.embeds.ActivateRegistration.color as ColorResolvable)
  embed.setDescription(appLang.embeds.ActivateRegistration.description)

  // Create button and message for validation 
  const btRegisterValidation = new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
      new ButtonBuilder()
        .setURL(appConf.Api.RegisterValidationLink.format(user.userId, user.token))
        .setLabel("Valider l'inscription")
        .setStyle(ButtonStyle.Link)
    )
  // Send Button and Message in user's DM
  member.user.send({ embeds: [embed], components: [btRegisterValidation] })

  res.sendStatus(200);
})

// Add Role to user after db validation
app.post("/userValidatedOnDB/:userId", async (req: express.Request, res: express.Response) => {

  //Get params
  const user = new UserValidatedOnDBModel();
  const jsonBody: UserValidatedOnDBModel = JSON.parse(((req as any).rawBody as string)) as UserValidatedOnDBModel;
  user.userId = jsonBody.userId;
  user.discordId = jsonBody.discordId;

  if (user.userId != req.params.userId) return res.status(400).send("Les id ne correspondent pas");


  // get guild
  const guild = await client.guilds.fetch(appConf.botConfig.guildid) as Guild

  let member: GuildMember = null as unknown as GuildMember;
  await guild.members.fetch(user.discordId)
    .then((user) => {
      member = user as GuildMember;
    })
    .catch((reason) => {
      return res.status(400).send("L'utilisateur n'est pas sur le serveur");
    });



  // get member on guild

  //get roles
  const role = await guild.roles.fetch(appConf.Roles.INSCRIT) as Role
  //Add role to user
  member.roles.add(role, "Inscription validée")

  // send Log
  let embed = new EmbedBuilder()
    .setColor(appLang.embeds.AccountActivated.color as ColorResolvable)
    .setAuthor({ name: "[+] {0}".format(member.user.tag) })
    .setDescription(appLang.embeds.AccountActivated.description.format(member.displayName))
    .setFooter({ text: "GuildMember Account Activated" })
    .setTimestamp()
    .setThumbnail(member.user.displayAvatarURL())

  const channel = member.guild.channels.cache.get(appConf.chanels.staff.serverLog) as TextChannel
  channel.send({
    embeds: [embed]
  })

  res.sendStatus(200);
})
