import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import {
	ApplicationCommandOptionType,
	AttachmentBuilder,
	ChannelType,
	CommandInteraction,
	TextChannel,
} from 'discord.js';
import lang from '../../../../Tools/language.json';
const serviceLang = lang.services.broadCast;
const cmdLang = serviceLang.commandInformation.getRawMessage;

export class GetRawMessageCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, {
			name: 'get-raw-message',
			category: 'Admin', //* Default category is InDev
			// type: '', //* Default type is SLASH_COMMAND
			description: cmdLang.description.desc,
			usage: cmdLang.description.usage,
			examples: cmdLang.description.exemples,
			options: [
				{
					type: ApplicationCommandOptionType.Channel,
					channelTypes: [
						ChannelType.GuildText,
						ChannelType.GuildNews,
						ChannelType.GuildPublicThread,
						ChannelType.GuildPrivateThread,
					],
					name: 'from-channel',
					description: cmdLang.slashOptions.fromChannel,
					required: true,
				},
				{
					type: ApplicationCommandOptionType.String,
					name: 'message-id',
					description: cmdLang.slashOptions.messageId,
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

		const fromChannel = i.options.get('from-channel', true)
			.channel as TextChannel;

		const messageId: string = i.options.get('message-id', true).value as string;

		try {
			const message = await fromChannel.messages.fetch(messageId);

			const attachment = new AttachmentBuilder(
				Buffer.from(message.content, 'utf-8'),
				{
					name: 'message.txt',
				},
			);

			return i.reply({
				files: [attachment, ...message.attachments.values()],
			});
		} catch (error) {
			console.error(error);
			i.reply(lang.bot.errorMessage);
			this.client.emit('ErrorCommandLog', i, error);
		}
	}
}
