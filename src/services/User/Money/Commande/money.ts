import { GetMoneyDTO } from '../../../../APIToUserApi/Models/GetMoneyDTO';
import { Command } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import lang from '../../../../Tools/language.json';
import MoneyController from '../../../../APIToUserApi/MoneyController';
import { AxiosResponse } from 'axios';
import {
	ApplicationCommandOptionType,
	CommandInteraction,
	GuildMember,
	EmbedBuilder,
	ColorResolvable,
} from 'discord.js';
const cmdLang = lang.commands.money;

export class MoneyCommand extends Command {
	constructor(client: ShewenyClient) {
		super(client, {
			name: 'money',
			category: 'Misc', //* Default category is InDev
			// type: '', //* Default type is SLASH_COMMAND
			description: cmdLang.description.desc as string,
			usage: cmdLang.description.usage as string,
			examples: cmdLang.description.exemples as string[],
			options: [
				{
					type: ApplicationCommandOptionType.User,
					name: 'user',
					description: cmdLang.slashOptions.User as string,
				},
			],
			// channel : '', //* Default Channel is GUILD
			// cooldown : , //* Default cooldown set at 2sec
			// adminsOnly : true, //* Default value is false
			userPermissions: ['UseApplicationCommands'],
			//clientPermissions : []
		});
	}
	async execute(i: CommandInteraction) {
		this.client.emit('CommandLog', i as CommandInteraction);
		try {
			await i.deferReply();

			const user = i.options.getUser('user');

			await MoneyController.getMoney(
				user ? user.id : (i.member as GuildMember).id,
			)
				.then((response: AxiosResponse<any, any>) => {
					const moneyDTO: GetMoneyDTO = response!.data as GetMoneyDTO;

					const embedMoney = new EmbedBuilder()
						.setTitle(
							cmdLang.embed.title.format(
								(i.member! as GuildMember).displayName,
							),
						)
						.setColor(cmdLang.embed.color as ColorResolvable)
						.addFields({
							name: cmdLang.embed.fields[0].name,
							value: `${moneyDTO.money.toString()}€`,
						})
						.setThumbnail(
							(i.member! as GuildMember).displayAvatarURL() as string,
						)
						.setAuthor({
							name: cmdLang.embed.author.name,
							url: cmdLang.embed.author.url,
						})
						.setTimestamp()
						.setFooter({ text: cmdLang.embed.footer });

					return i.editReply({
						embeds: [embedMoney],
					});
				})
				.catch(e => {
					console.log(e);

					return i.editReply({
						content: lang.bot.errorMessage as string,
					});
				});
		} catch (error) {
			i.reply(lang.bot.errorMessage);
			this.client.emit('ErrorCommandLog', i, error);
		}
	}
}
