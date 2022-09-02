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
	async execute(i: CommandInteraction) {
		this.client.emit('AdminCommandLog', i as CommandInteraction);

		try {
			const guild: Guild = i.guild as Guild;

			const fromChannel = i.channel as TextChannel;

			const messageId = i.options.get('message-id', true).value;
			const message = (await fromChannel!.messages.fetch(
				messageId as string,
			)) as Message;

			const toChannelId = i.options.get('to-channel', true).value;
			const toChannel = (await guild.channels.fetch(
				toChannelId as string,
			)) as TextChannel;

			await toChannel!.send({
				content: message.content,
				embeds: message.embeds,
				components: message.components,
				files: message.attachments.map(a => a),
			});
			return i.reply({
				content: 'Le message a bien été envoyé dans le channel {0}'.format(
					toChannel.name,
				),
			});
		} catch (error) {
			i.reply(lang.bot.errorMessage);
			this.client.emit('ErrorCommandLog', i, error);
		}
	}
}
