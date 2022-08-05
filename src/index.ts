import { ShewenyClient } from "sheweny"
import appConfig from "./util/appConfig.json"
import lang from './util/language.json'
import dotenv from 'dotenv'
import { app } from './APIToBot/api'
import { ActivityType } from "discord.js"
// import express from 'express';
// import { TextChannel } from "discord.js";
// import { userValidateModel } from "./Api/Model/UserValidatedModel";

dotenv.config();

export const client = new ShewenyClient({
  intents: 32767,
  admins: appConfig.botConfig.admins, // Admins perms pour le bot
  mode: "production", //mode de lancement pour l'app
  presence: { //status du bot 
    status: "online",
    afk: false,
    activities: [{
      name: lang.bot.status.name,
      type: ActivityType.Playing,
    }],
  },
  managers: {
    commands: {
      directory: "./commands", // command directory
      guildId: appConfig.botConfig.guildid,
      applicationPermissions: false, //If the permissions for app commands must be required
      autoRegisterApplicationCommands: true, // Register application commands
      default: { // set default params for all commands
        adminOnly: false,
        category: 'InDev',
        channel: 'GUILD',
        cooldown: 2,
        examples: ['/newExample', '/newExample'],
        usage: ['/newExample aaa'],
        type: 'SLASH_COMMAND',
      }
    },
    events: {
      directory: "./listeners", //Event directory
    },
    buttons: {
      directory: "./interactions/buttons", //Button directory
    },
    selectMenus: {
      directory: "./interactions/selectMenu",
    },
    // inhibitors: {
    //     directory: "./inhibitors",
    //     loadAll: true,
    // },
  },
}
);
client.login(process.env.TOKEN);
app.listen(process.env.PORT, () => console.log(`server started at http://localhost:${process.env.PORT}`));