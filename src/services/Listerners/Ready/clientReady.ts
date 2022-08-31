import { join } from 'path';
import { Event } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import lang from '../../../Tools/language.json';
const date = new Date();
import appConfig from '../../../Util/appConfig.json';
import type { TextChannel } from 'discord.js';
import { readFileSync } from 'fs';
// import { app } from '../../../APIToBot/api';
const eventLang = lang.event.ready;

export class Ready extends Event {
	constructor(client: ShewenyClient) {
		super(client, 'ready', {
			description: eventLang.description,
			once: true,
		});
	}

	async execute() {
		await this.client.application!.commands.set([]);
		await this.client.managers.commands!.loadAll();

		// await app.listen(process.env.BOT_API_PORT, () =>
		// 	console.log(`server started at ${process.env.BOT_API_URL}`),
		// );

		const packageInfos = readFileSync(
			join(process.cwd(), '/package.json'),
		).toString();

		const ReadyMessage = `${eventLang.message} in v${
			JSON.parse(packageInfos).version
		} at ${date.getHours()}H ${
			date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`
		}`;
		console.log(ReadyMessage); //Send ready message in consol
		const channel = this.client.channels.cache.get(
			appConfig.chanels.staff.botDev,
		)! as TextChannel; //Get logbot channel with id and check if is textchannel
		return channel.send(ReadyMessage);
	}
}
