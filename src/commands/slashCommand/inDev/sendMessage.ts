import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import {
	ApplicationCommandOptionType,
	CommandInteraction,
	Guild,
	Message,
	TextChannel,
} from 'discord.js';
import lang from '../../../util/language.json';
const CommandLang = lang.commands.sendMessage;

export class SendMessageCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, {
			name: 'sendmessage',
			// category: '', //* Default category is InDev
			// type: '', //* Default type is SLASH_COMMAND
			description: CommandLang.description.desc,
			usage: CommandLang.description.usage,
			examples: CommandLang.description.exemples,
			options: [
				{
					type: ApplicationCommandOptionType.Channel,
					name: 'from-channel',
					description: CommandLang.slashOptions.channel,
					required: true,
				},
				{
					type: ApplicationCommandOptionType.String,
					name: 'message-id',
					description: CommandLang.slashOptions.channel,
					required: true,
				},
				{
					type: ApplicationCommandOptionType.Channel,
					name: 'to-channel',
					description: CommandLang.slashOptions.channel,
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
	async execute(interaction: CommandInteraction) {
		this.client.emit('CommandLog', interaction as CommandInteraction);

		const guild: Guild = interaction.guild as Guild;

		const fromChannelId = interaction.options.get('from-channel', true).value;
		const fromChannel = (await guild.channels.fetch(
			fromChannelId as string,
		)) as TextChannel;

		const messageId = interaction.options.get('message-id', true).value;
		const message = (await fromChannel!.messages.fetch(
			messageId as string,
		)) as Message;
		console.log(message);

		const toChannelId = interaction.options.get('to-channel', true).value;
		const toChannel = (await guild.channels.fetch(
			toChannelId as string,
		)) as TextChannel;

		await toChannel!.send({
			content: message.content,
			embeds: message.embeds,
			components: message.components,
		});
		return interaction.reply({
			content: 'send Message',
		});
	}

	//     onAutocomplete(interaction: AutocompleteInteraction) {
	//         const focusedOption = interaction.options.getFocused(true);
	//         let choices : Array<any>;
	//
	//         if (focusedOption.name === "name") {
	//             choices = ["faq", "install", "collection", "promise", "debug"];
	//         }
	//
	//         if (focusedOption.name === "theme") {
	//             choices = ["halloween", "christmas", "summer"];
	//         }
	//
	//         const filtered = choices!.filter((choice: any) =>
	//             choice.startsWith(focusedOption.value)
	//         );
	//         interaction
	//             .respond(filtered.map((choice: any) => ({ name: choice, value: choice })))
	//     }
}
