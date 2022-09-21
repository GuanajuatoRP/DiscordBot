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

			let user = i.options.getMember('user') as GuildMember;

			user = user ? user : (i.member as GuildMember);

			await MoneyController.getMoney(user.id)
				.then((response: AxiosResponse<any, any>) => {
					const moneyDTO: GetMoneyDTO = response!.data as GetMoneyDTO;

					const embedMoney = new EmbedBuilder()
						.setTitle(cmdLang.embed.title.format(user.displayName))
						.setColor(cmdLang.embed.color as ColorResolvable)
						.setThumbnail(user.displayAvatarURL() as string)
						.setAuthor({
							name: cmdLang.embed.author.name,
							url: cmdLang.embed.author.url,
						})
						.setTimestamp()
						.setFooter({ text: cmdLang.embed.footer });

					if (moneyDTO.money < 0) {
						embedMoney.addFields(
							{
								name: cmdLang.embed.fields[0].name,
								value: `⚠️⚠️${moneyDTO.money.toString()}€⚠️⚠️`,
							},
							{
								name: 'Attention le compte est à découvert !',
								value: `T'an que le compte est à découvert.\nTu ne pourras plus dépenser d'argent !`,
							},
						);
					} else {
						embedMoney.addFields({
							name: cmdLang.embed.fields[0].name,
							value: `${moneyDTO.money.toString()}€`,
						});
					}

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
