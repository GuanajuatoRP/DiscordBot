import { ShewenyClient } from 'sheweny';
import appConfig from './util/appConfig.json';
import lang from './util/language.json';
import dotenv from 'dotenv';
import { ActivityType } from 'discord.js';

dotenv.config();
if (process.env.NODE_ENV)
	dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
else dotenv.config({ path: `.env.development` }); //Load config.env

export const client = new ShewenyClient({
	intents: 32767,
	admins: appConfig.botConfig.admins, // Admins perms pour le bot
	mode: process.env.MODE || 'development', //mode de lancement pour l'app
	presence: {
		//status du bot
		status: 'online',
		afk: false,
		activities: [
			{
				name: lang.bot.status.name,
				type: ActivityType.Playing,
			},
		],
	},
	managers: {
		commands: {
			directory: './commands', // command directory
			guildId: process.env.GUILD_ID,
			applicationPermissions: false, //If the permissions for app commands must be required
			autoRegisterApplicationCommands: true, // Register application commands
			default: {
				// set default params for all commands
				adminOnly: false,
				category: 'InDev',
				channel: 'GUILD',
				cooldown: 2,
				examples: ['/newExample', '/newExample'],
				usage: ['/newExample aaa'],
				type: 'SLASH_COMMAND',
			},
		},
		events: {
			directory: './listeners', //Event directory
		},
		buttons: {
			directory: './interactions/buttons', //Button directory
		},
		selectMenus: {
			directory: './interactions/selectMenu',
		},
		// inhibitors: {
		//     directory: "./inhibitors",
		//     loadAll: true,
		// },
	},
});

client.login(process.env.TOKEN);
