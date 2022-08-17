import { GetMoneyDTO } from './../../../APIToUserApi/Models/GetMoneyDTO';
import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import lang from '../../../tools/language.json';
import MoneyController from '../../../APIToUserApi/MoneyController';
import { AxiosResponse } from 'axios';
import {
	ApplicationCommandOptionType,
	CommandInteraction,
	GuildMember,
	EmbedBuilder,
	ColorResolvable,
} from 'discord.js';
const CommandLang = lang.commands.money;

export class MoneyCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, {
			name: 'money',
			category: 'Misc', //* Default category is InDev
			// type: '', //* Default type is SLASH_COMMAND
			description: CommandLang.description.desc as string,
			usage: CommandLang.description.usage as string,
			examples: CommandLang.description.exemples as string[],
			options: [
				{
					type: ApplicationCommandOptionType.User,
					name: 'user',
					description: CommandLang.slashOptions.User as string,
				},
			],
			// channel : '', //* Default Channel is GUILD
			// cooldown : , //* Default cooldown set at 2sec
			// adminsOnly : true, //* Default value is false
			userPermissions: ['UseApplicationCommands'],
			//clientPermissions : []
		});
	}
	async execute(interaction: CommandInteraction) {
		this.client.emit('CommandLog', interaction as CommandInteraction);
		await interaction.deferReply();

		const user = interaction.options.getUser('user');

		await MoneyController.getMoney(
			user ? user.id : (interaction.member as GuildMember).id,
		)
			.then((response: AxiosResponse<any, any>) => {
				const moneyDTO: GetMoneyDTO = response!.data as GetMoneyDTO;

				const embedMoney = new EmbedBuilder()
					.setTitle(
						CommandLang.embed.title.format(
							(interaction.member! as GuildMember).displayName,
						),
					)
					.setColor(CommandLang.embed.color as ColorResolvable)
					.addFields({
						name: CommandLang.embed.fields[0].name,
						value: `${moneyDTO.money.toString()}€`,
					})
					.setThumbnail(
						(interaction.member! as GuildMember).displayAvatarURL() as string,
					)
					.setAuthor({
						name: CommandLang.embed.author.name,
						url: CommandLang.embed.author.url,
					})
					.setTimestamp()
					.setFooter({ text: CommandLang.embed.footer });

				return interaction.editReply({
					embeds: [embedMoney],
				});
			})
			.catch(e => {
				console.log(e);

				return interaction.editReply({
					content: lang.bot.errorMessage as string,
				});
			});
	}
}
