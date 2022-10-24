import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import {
	ApplicationCommandOptionType,
	ChannelType,
	CommandInteraction,
	Message,
	TextChannel,
} from 'discord.js';
import lang from '../../../../Tools/language.json';
const cmdLang = lang.commands.updateMessage;

export class UpdateMessageCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, {
			name: 'update-message',
			category: 'Admin', //* Default category is InDev
			// type: '', //* Default type is SLASH_COMMAND
			description: cmdLang.description.desc,
			usage: cmdLang.description.usage,
			examples: cmdLang.description.exemples,
			options: [
				{
					type: ApplicationCommandOptionType.String,
					name: 'from-message-id',
					description: cmdLang.slashOptions.messageIdFrom,
					autocomplete: false,
					required: true,
				},
				{
					type: ApplicationCommandOptionType.Channel,
					channelTypes: [
						ChannelType.GuildText,
						ChannelType.GuildNews,
						ChannelType.GuildPublicThread,
						ChannelType.GuildPrivateThread,
					],
					name: 'to-channel',
					description: cmdLang.slashOptions.channelTo,
					required: true,
				},
				{
					type: ApplicationCommandOptionType.String,
					name: 'to-message-id',
					description: cmdLang.slashOptions.messageIdTo,
					autocomplete: false,
					required: true,
				},
			],
			// channel : '', //* Default Channel is GUILD
			// cooldown : , //* Default cooldown set at 2sec
			adminsOnly: true, //* Default value is false
			userPermissions: ['UseApplicationCommands'],
			//clientPermissions : []
		});
	}
	async execute(i: CommandInteraction) {
		this.client.emit('AdminCommandLog', i as CommandInteraction);

		const fromChannel = i.channel as TextChannel;
		const toChannel = i.options.get('to-channel', true).channel as TextChannel;

		const fromMessageId: string = i.options.get('from-message-id', true)
			.value as string;
		const toMessageId: string = i.options.get('to-message-id', true)
			.value as string;

		try {
			const fromMessage = (await fromChannel.messages
				.fetch(fromMessageId)
				.catch(error => {
					return i.reply(cmdLang.errors.fromMessageNotFound);
				})) as Message;

			const toMessage = (await toChannel.messages
				.fetch(toMessageId)
				.catch(error => {
					return i.reply(lang.bot.errorMessage);
				})) as Message;

			if (!toMessage.editable) return i.reply(cmdLang.errors.toMessageNotFound);

			await toMessage.edit({
				content: fromMessage.content,
				embeds: fromMessage.embeds,
				components: fromMessage.components,
				files: fromMessage.attachments.map(a => a),
			});

			return i.reply({
				content: cmdLang.validation.format(toChannel.name, toMessage.url),
			});
		} catch (error) {
			return i.reply(lang.bot.errorMessage);
		}
	}
}
