import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import { CommandInteraction } from 'discord.js';
// import lang from '../../../util/language.json'
// const CommandLang = lang.commands.test

export class UpCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, {
			name: 'up',
			// category: '', //* Default category is InDev
			// type: '', //* Default type is SLASH_COMMAND
			description: 'CommandLang.description.desc',
			usage: 'CommandLang.description.usage',
			examples: 'CommandLang.description.exemples',
			options: [
				// {
				// type : 'STRING',
				// name: 'commande',
				// description: CommandLang,
				// autocomplete : false,
				// required : false,
				//}
			],
			// channel : '', //* Default Channel is GUILD
			// cooldown : , //* Default cooldown set at 2sec
			adminsOnly: true, //* Default value is false
			//userPermissions : [],
			//clientPermissions : []
		});
	}
	execute(interaction: CommandInteraction) {
		this.client.emit('CommandLog', interaction);

		interaction.reply({
			content: 'updated',
			ephemeral: true,
		});
	}
}
