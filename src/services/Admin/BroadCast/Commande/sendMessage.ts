import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import {
	ApplicationCommandOptionType,
	ChannelType,
	CommandInteraction,
	Guild,
	Message,
	TextChannel,
} from 'discord.js';
import lang from '../../../../Tools/language.json';
const cmdLang = lang.commands.sendMessage;

export class SendMessageCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, {
			name: 'send-message',
			category: 'Admin', //* Default category is InDev
			// type: '', //* Default type is SLASH_COMMAND
			description: cmdLang.description.desc,
			usage: cmdLang.description.usage,
			examples: cmdLang.description.exemples,
			options: [
				{
					type: ApplicationCommandOptionType.Channel,
					channelTypes: [ChannelType.GuildText],
					name: 'from-channel',
					description: cmdLang.slashOptions.channelFrom,
					required: true,
				},
				{
					type: ApplicationCommandOptionType.String,
					name: 'message-id',
					description: cmdLang.slashOptions.messageId,
					required: true,
				},
				{
					type: ApplicationCommandOptionType.Channel,
					channelTypes: [ChannelType.GuildText],
					name: 'to-channel',
					description: cmdLang.slashOptions.channelTo,
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

		try {
			const guild: Guild = interaction.guild as Guild;

			const fromChannelId = interaction.options.get('from-channel', true).value;
			const fromChannel = (await guild.channels.fetch(
				fromChannelId as string,
			)) as TextChannel;

			const messageId = interaction.options.get('message-id', true).value;
			const message = (await fromChannel!.messages.fetch(
				messageId as string,
			)) as Message;

			const toChannelId = interaction.options.get('to-channel', true).value;
			const toChannel = (await guild.channels.fetch(
				toChannelId as string,
			)) as TextChannel;

			await toChannel!.send({
				content: message.content,
				embeds: message.embeds,
				components: message.components,
				files: message.attachments.map(a => a),
			});
			return interaction.reply({
				content: 'Le message a bien été envoyé dans le channel {0}'.format(
					toChannel.name,
				),
			});
		} catch (error) {
			interaction.reply(lang.bot.errorMessage);
			this.client.emit('ErrorCommandLog', interaction, error);
		}
	}
}
