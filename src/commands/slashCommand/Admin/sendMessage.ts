import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import {
	ApplicationCommandOptionType,
	CommandInteraction,
	Guild,
	Message,
	TextChannel,
} from 'discord.js';
import lang from '../../../tools/language.json';
const CommandLang = lang.commands.sendMessage;

export class SendMessageCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, {
			name: 'sendmessage',
			category: 'Admin', //* Default category is InDev
			// type: '', //* Default type is SLASH_COMMAND
			// description:
			// 	"Permet d'envoyé un message, qui a au préalable été crée, le formatage restera tel quel.",
			description: CommandLang.description.desc,
			// usage:
			// 	"sendMessage {Channel d'ou provien le message} {Id du message a envoyé} {Channel dans le quel envoyé le message}",
			usage: CommandLang.description.usage,
			// examples: [
			// 	'sendMessage from-channel:help message-id:1587569320 to-channel:Generale',
			// ],
			examples: CommandLang.description.exemples,
			options: [
				{
					type: ApplicationCommandOptionType.Channel,
					name: 'from-channel',
					// description: 'Channel ou est présent le message a envoyé',
					description: 'CommandLang.slashOptions.channelFrom',
					required: true,
				},
				{
					type: ApplicationCommandOptionType.String,
					name: 'message-id',
					// description: 'Id du message a envoyé',
					description: 'CommandLang.slashOptions.messageId',
					required: true,
				},
				{
					type: ApplicationCommandOptionType.Channel,
					name: 'to-channel',
					// description: 'Channel ou envoyé le message',
					description: 'CommandLang.slashOptions.channelTo',
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
			console.log(error);

			return interaction.reply({
				content: lang.bot.errorMessage,
			});
		}
	}
}
