import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	CommandInteraction,
} from 'discord.js';

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

		const register = new ActionRowBuilder<ButtonBuilder>().addComponents(
			new ButtonBuilder()
				.setLabel('Je créé mon compte !')
				.setStyle(ButtonStyle.Link)
				.setURL(
					'https://discord.com/oauth2/authorize?client_id=899735680714936390&redirect_uri=http%3A%2F%2Fguanajuato-roleplay.fr%2Fregister&response_type=code&scope=identify%20guilds&prompt=none',
				),
		);
		const activateAcount = new ActionRowBuilder<ButtonBuilder>().addComponents(
			new ButtonBuilder()
				.setCustomId('ActivateAccount')
				.setLabel('Activer le compte')
				.setStyle(ButtonStyle.Primary),
		);

		return i.reply({
			components: [register, activateAcount],
		});
	}
}
