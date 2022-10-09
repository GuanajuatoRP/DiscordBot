import { Event } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import type { Message } from 'discord.js';
import lang from '../../../Tools/language.json';
const eventLang = lang.event.feurTroll;

export class MessageCreate extends Event {
	constructor(client: ShewenyClient) {
		super(client, 'messageCreate', {
			description: eventLang.description,
			once: false,
		});
	}

	execute(message: Message) {
		const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
		const possibleTroll = message.content
			.toLowerCase()
			.replace(regex, '')
			.trim();

		if (possibleTroll.endsWith('quoi'))
			return message.reply('feur :sunglasses:');
		else if (possibleTroll.endsWith('yo'))
			return message.reply('plait :stuck_out_tongue_closed_eyes:');
		else if (possibleTroll.endsWith('ou'))
			return message.reply('ragan :ocean:');
		else if (possibleTroll.endsWith('comment'))
			return message.reply('dant :disguised_face:');
		else if (possibleTroll.endsWith('oui'))
			return message.reply('stiti :see_no_evil:');
		else if (possibleTroll.endsWith('hein'))
			return message.reply('dien :hindu_temple:');
	}
}
