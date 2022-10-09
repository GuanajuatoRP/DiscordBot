import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import { CommandInteraction } from 'discord.js';

export class TestCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, {
			name: 'test',
			// category: 'Misc', //* Default category is InDev
			// type: '', //* Default type is SLASH_COMMAND
			description: 'test description',
			usage: 'test usage',
			examples: 'test examples',
			options: [],
			// channel : '', //* Default Channel is GUILD
			// cooldown : , //* Default cooldown set at 2sec
			adminsOnly: true, //* Default value is false
			//userPermissions : [],
			//clientPermissions : []
		});
	}
	async execute(i: CommandInteraction) {
		this.client.emit('CommandLog', i as CommandInteraction);

		await i.deferReply();

		this.client.emit('guildMemberBoost', i.member);

		return i.editReply({
			content: `ok 200`,
		});
	}
}
