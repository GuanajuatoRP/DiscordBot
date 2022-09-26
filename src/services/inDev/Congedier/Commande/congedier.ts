import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import { CommandInteraction } from 'discord.js';
import lang from '../../../../tools/language.json';
const cmdLang = lang.commands.congedier;

export class CongedierCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, {
			name: 'congedier',
			category: '', //* Default category is InDev
			// type: '', //* Default type is SLASH_COMMAND
			description: cmdLang.description.desc,
			usage: cmdLang.description.usage,
			examples: cmdLang.description.exemples,
			// options: [
			// 	{
			// 		type: ApplicationCommandOptionType.String,
			// 		name: 'command',
			// 		description: cmdLang.slashOptions.optionName,
			// 		required: true,
			// 		autocomplete: true,
			// 	},
			// ],
			// channel : '', //* Default Channel is GUILD
			// cooldown : , //* Default cooldown set at 2sec
			adminsOnly: true, //* Default value is false
			//userPermissions : [],
			//clientPermissions : []
		});
	}
	execute(i: CommandInteraction) {
		this.client.emit('CommandLog', i);

		console.log(i.member);

		i.reply({
			content: 'congedier',
		});
	}
}
