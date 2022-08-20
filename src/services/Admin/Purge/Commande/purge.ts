import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import {
	ApplicationCommandOptionType,
	ChannelType,
	CommandInteraction,
} from 'discord.js';
import lang from '../../../../Tools/language.json';
const cmdLang = lang.commands.purge;

export class PurgeCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, {
			name: 'purge',
			category: 'Admin', //* Default category is InDev
			// type: '', //* Default type is SLASH_COMMAND
			description: cmdLang.description.desc,
			usage: cmdLang.description.usage,
			examples: cmdLang.description.exemples,
			options: [
				{
					type: ApplicationCommandOptionType.Number,
					minValue: 1,
					maxValue: 100,
					name: 'nombre',
					description: cmdLang.slashOptions.nombre.description,
					autocomplete: false,
					required: true,
				},
			],
			// channel : '', //* Default Channel is GUILD
			// cooldown : , //* Default cooldown set at 2sec
			adminsOnly: true, //* Default value is false
			//userPermissions : [],
			//clientPermissions : []
		});
	}
	async execute(i: CommandInteraction) {
		this.client.emit('AdminCommandLog', i as CommandInteraction);

		const nombre: number = i.options.get('nombre', true).value as number;
		let messages = await i.channel!.messages.fetch({
			limit: nombre,
			before: i.id,
		});
		messages = messages.filter(message => message.pinned === false);
		try {
			const channel = i.channel!;
			if (channel.type === ChannelType.DM) return;
			await channel.bulkDelete(messages);
		} catch (error) {
			return i.reply({
				content: cmdLang.messageError.maxDays,
				ephemeral: true,
			});
		}
		return i.reply({
			content: cmdLang.i.content,
			ephemeral: true,
		});
	}
}
