import { ShewenyClient } from "sheweny"
import appConfig from "./util/appConfig.json"
import lang from './util/language.json'
import dotenv from 'dotenv';


const client = new ShewenyClient({
    intents: 32767,
    admins: appConfig.botConfig.admins, // Admins perms pour le bot
    mode: 'development', //mode de lancement pour l'app
    presence: { //status du bot 
        status: "online",
        afk: false,
        activities: [{
            name: lang.bot.status.name,
            type: 'PLAYING',
        }],
    },
    managers: {
        commands: {
            directory: "./commands", // command directory
            loadAll: true,
            guildId: appConfig.botConfig.guildid,
            applicationPermissions: false, //If the permissions for app commands must be required
            autoRegisterApplicationCommands: true, // Register application commands
            default : { // set default params for all commands
                adminOnly : false,
                category : 'InDev',
                channel : 'GUILD',
                cooldown : 2,
                examples : ['/newExample','/newExample'],
                usage : ['/newExample aaa'],
                type : 'SLASH_COMMAND',
            }
        },
        events: {
            directory: "./listeners", //Event directory
            loadAll: true,
        },
        buttons: {
            directory: "./interactions/buttons", //Button directory
            loadAll: true,
        },
        // inhibitors: {
        //     directory: "./inhibitors",
        //     loadAll: true,
        // },
        // selectMenus: {
        //     directory: "./interactions/select-menu",
        //     loadAll: true,
        // },
    },
});
dotenv.config();
client.login(process.env.TOKEN);