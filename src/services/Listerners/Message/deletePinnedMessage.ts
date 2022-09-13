import { Event } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import type { Message } from 'discord.js';
import lang from '../../../Tools/language.json';
const eventLang = lang.event.deletePinnedMessageAlerte;

export class MessageCreate extends Event {
	constructor(client: ShewenyClient) {
		super(client, 'messageCreate', {
			description: eventLang.description,
			once: false,
		});
	}

	execute(message: Message) {
		if (message.type === 6 || message.type === 18)
			setTimeout(() => message.delete(), 2000);
	}
}
