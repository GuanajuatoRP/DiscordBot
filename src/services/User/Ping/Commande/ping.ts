import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import type { CommandInteraction } from 'discord.js';
import lang from '../../../../tools/language.json';
const cmdLang = lang.commands.ping;

export class PingCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, {
			name: 'ping',
			category: 'Misc', //* Default category is InDev
			// type: '', //* Default type is SLASH_COMMAND
			description: cmdLang.description.desc,
			usage: cmdLang.description.usage,
			examples: cmdLang.description.exemples,
			options: [
				// {   type : 'STRING',
				// name: 'commande',
				// description: '',
				// autocomplete : false,
				// required : false,
				// choices : []}
			],
			// channel : '', //* Default Channel is GUILD
			// cooldown : , //* Default cooldown set at 2sec
			// adminsOnly : , //* Default value is false
			userPermissions: ['UseApplicationCommands'],
			clientPermissions: [],
		});
	}
	execute(interaction: CommandInteraction) {
		this.client.emit('CommandLog', interaction as CommandInteraction);
		try {
			// get latency between bot and user
			const start = Date.now();

			interaction.reply({ content: 'Pong !', ephemeral: false }).then(() => {
				const end = Date.now();
				const time = end - start;
				interaction.editReply({ content: `Pong : ${time}ms` });
			});
		} catch (error) {
			interaction.reply(lang.bot.errorMessage);
			this.client.emit('FailCommandLog', interaction, error);
		}
	}
}
