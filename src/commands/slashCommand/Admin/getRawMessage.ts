import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import {
	ApplicationCommandOptionType,
	AttachmentBuilder,
	ChannelType,
	CommandInteraction,
	TextChannel,
} from 'discord.js';
import lang from '../../../tools/language.json';
const cmdLang = lang.commands.rawMessage;

export class GetRawMessageCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, {
			name: 'rawmessage',
			// category: '', //* Default category is InDev
			// type: '', //* Default type is SLASH_COMMAND
			description: cmdLang.description.desc,
			usage: cmdLang.description.usage,
			examples: cmdLang.description.exemples,
			options: [
				{
					type: ApplicationCommandOptionType.Channel,
					channelTypes: [ChannelType.GuildText],
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
	async execute(interaction: CommandInteraction) {
		this.client.emit('AdminCommandLog', interaction as CommandInteraction);

		const fromChannel = interaction.options.get('from-channel', true)
			.channel as TextChannel;

		const messageId: string = interaction.options.get('message-id', true)
			.value as string;

		try {
			const message = await fromChannel.messages.fetch(messageId);

			const attachment = new AttachmentBuilder(
				Buffer.from(message.content, 'utf-8'),
				{
					name: 'message.txt',
				},
			);

			return interaction.reply({
				files: [attachment, ...message.attachments.values()],
			});
		} catch (error) {
			return interaction.reply(lang.bot.errorMessage);
		}
	}
}
