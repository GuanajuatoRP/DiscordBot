import { ShewenyClient } from "sheweny"
import appConfig from "./util/appConfig.json"
import lang from './util/language.json'
import dotenv from 'dotenv';


const client = new ShewenyClient({
    intents: 32767,
    admins: appConfig.botConfig.admins, // Admins permissions for the bot
    mode: 'development', //The mode for run application
    presence: { // define status and activites of bot 
        status: "online",
        afk: false,
        activities: [{
            name: lang.bot.status.name,
            type: 'PLAYING',
        }],
    },
    managers: {
        commands: {
            directory: "./commands", // Directory where commands are stored
            loadAll: true, // Load all commands
            guildId: appConfig.botConfig.guildid, //The guild to register commands
            applicationPermissions: false, //If the permissions for app commands must be required
            autoRegisterApplicationCommands: true, // Register application commands
            default : { // set default params for all commands
                adminOnly : false,
                category : 'InDev',
                channel : 'GUILD',
                cooldown : 2,
                examples : ['/newExample'],
                usage : ['/newExample aaa'],
                type : 'SLASH_COMMAND',
            }
        },
        events: {
            directory: "./listeners",
            loadAll: true,
        },
        buttons: {
            directory: "./interactions/buttons",
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